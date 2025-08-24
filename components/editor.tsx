'use client'

import { useEffect, useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { editor } from 'monaco-editor'

import { useBlogStore } from '@/hooks/blog-store'

export interface EditorRef {
  getSelectedText: () => string
  replaceSelectedText: (newText: string) => void
  insertText: (text: string) => void
  getCurrentLineContent: () => string
  insertAtCursor: (text: string) => void
  replaceCurrentLine: (newText: string) => void
}

interface EditorProps {
  onEditorReady?: (editorMethods: EditorRef) => void
  disabled?: boolean
}

export function Editor({ onEditorReady, disabled = false }: EditorProps) {
  const { markdown, setMarkdown } = useBlogStore()
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor

    // Expose editor methods to parent
    const editorMethods: EditorRef = {
      getSelectedText: () => {
        if (!editorRef.current) return ''
        const selection = editorRef.current.getSelection()
        if (!selection) return ''
        return editorRef.current.getModel()?.getValueInRange(selection) || ''
      },
      getCurrentLineContent: () => {
        if (!editorRef.current) return ''
        const position = editorRef.current.getPosition()
        if (!position) return ''
        const model = editorRef.current.getModel()
        if (!model) return ''
        return model.getLineContent(position.lineNumber)
      },
      insertAtCursor: (text: string) => {
        if (!editorRef.current) return
        const position = editorRef.current.getPosition()
        if (!position) return

        editorRef.current.executeEdits('', [
          {
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            },
            text: text
          }
        ])

        // Update the store with the new content
        const newContent = editorRef.current.getValue()
        setMarkdown(newContent)
      },
      replaceCurrentLine: (newText: string) => {
        if (!editorRef.current) return
        const position = editorRef.current.getPosition()
        if (!position) return
        const model = editorRef.current.getModel()
        if (!model) return

        const lineLength = model.getLineLength(position.lineNumber)
        editorRef.current.executeEdits('', [
          {
            range: {
              startLineNumber: position.lineNumber,
              startColumn: 1,
              endLineNumber: position.lineNumber,
              endColumn: lineLength + 1
            },
            text: newText
          }
        ])

        // Update the store with the new content
        const newContent = editorRef.current.getValue()
        setMarkdown(newContent)
      },
      replaceSelectedText: (newText: string) => {
        if (!editorRef.current) return
        const selection = editorRef.current.getSelection()
        if (!selection) return

        editorRef.current.executeEdits('', [
          {
            range: selection,
            text: newText
          }
        ])

        // Update the store with the new content
        const newContent = editorRef.current.getValue()
        setMarkdown(newContent)
      },
      insertText: (text: string) => {
        if (!editorRef.current) return
        const position = editorRef.current.getPosition()
        if (!position) return

        editorRef.current.executeEdits('', [
          {
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            },
            text: text
          }
        ])

        // Update the store with the new content
        const newContent = editorRef.current.getValue()
        setMarkdown(newContent)
      }
    }

    onEditorReady?.(editorMethods)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.layout()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="border-input focus-within:ring-ring/50 focus-within:border-ring h-full overflow-hidden rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]">
      <MonacoEditor
        height="100%"
        language="markdown"
        value={markdown}
        onChange={value => setMarkdown(value || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          fontSize: 14,
          padding: { top: 8, bottom: 8 },
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Menlo", monospace',
          automaticLayout: true,
          readOnly: disabled
        }}
        theme="vs-dark"
      />
    </div>
  )
}

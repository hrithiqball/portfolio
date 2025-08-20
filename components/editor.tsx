'use client'

import { useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'

import { useBlogStore } from '@/hooks/blog-store'

export function Editor() {
  const { markdown, setMarkdown } = useBlogStore()

  useEffect(() => {
    return () => {
      setMarkdown('')
    }
  }, [setMarkdown])

  return (
    <div className="border-input focus-within:ring-ring/50 focus-within:border-ring h-full overflow-hidden rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]">
      <MonacoEditor
        height="100%"
        language="markdown"
        value={markdown}
        onChange={(value: string | undefined) => setMarkdown(value || '')}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          fontSize: 14,
          padding: { top: 8, bottom: 8 },
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Menlo", monospace',
          automaticLayout: true
        }}
        theme="vs-dark"
      />
    </div>
  )
}

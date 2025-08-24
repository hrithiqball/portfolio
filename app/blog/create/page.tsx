'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import {
  Bold,
  Code,
  FileText,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Loader2,
  Quote
} from 'lucide-react'
import { toast } from 'sonner'

import { createPostAction, uploadImageAction } from '@/app/blog/create/actions'
import { Editor, EditorRef } from '@/components/editor'
import { RainbowButton } from '@/components/magicui/rainbow-button'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useBlogStore } from '@/hooks/blog-store'

export default function CreateBlogPage() {
  const router = useRouter()
  const { markdown, setMarkdown } = useBlogStore()
  const [state, formAction] = useActionState(createPostAction, { success: undefined })
  const [activeTab, setActiveTab] = useState('edit')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [headerFile, setHeaderFile] = useState<File | null>(null)
  const [editorMethods, setEditorMethods] = useState<EditorRef | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message || 'Blog created successfully!')
      setIsDialogOpen(false)
      setTimeout(() => {
        router.push('/blog')
      }, 1500)
    }

    if (state.success === false && state.error) {
      toast.error('Creation failed. Please try again.', {
        description: state.error
      })
    }
  }, [state, router])

  const handleSubmit = (formData: FormData) => {
    formData.append('markdown', markdown)
    formAction(formData)
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const result = await uploadImageAction(formData)

      if (!result.success) {
        toast.error(result.error || 'Failed to upload image')
        return null
      }

      return result.key || null
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Failed to upload image')
      return null
    }
  }

  const handleImageUpload = async () => {
    if (!imageFile) {
      toast.error('Please select an image first')
      return
    }

    setIsUploadingImage(true)

    try {
      const key = await uploadImage(imageFile)
      if (key) {
        const imageUrl = `![Image](${process.env.NEXT_PUBLIC_WORKER_URL}/img/${key})`
        await navigator.clipboard.writeText(imageUrl)
        toast.success('Image uploaded successfully! Key copied to clipboard.')

        setImageFile(null)
      }
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleFormatMarkdown = () => {
    if (!editorMethods) {
      toast.error('Editor not ready')
      return
    }

    try {
      const currentContent = markdown

      if (!currentContent.trim()) {
        toast.info('No content to format')
        return
      }

      let formatted = currentContent
        .replace(/\n{3,}/g, '\n\n')
        .replace(/^(#{1,6})\s*/gm, '$1 ')
        .replace(/^(\s*[-*+])\s*/gm, '$1 ')
        .replace(/^(\s*\d+\.)\s*/gm, '$1 ')
        .replace(/^>\s*/gm, '> ')
        .replace(/\*\*([^*]+)\*\*/g, '**$1**')
        .replace(/\*([^*]+)\*/g, '*$1*')
        .replace(/```(\w+)?\n/g, '```$1\n')
        .replace(/[ \t]+$/gm, '')
        .replace(/\n*$/, '\n')

      setMarkdown(formatted)
      toast.success('Markdown formatted successfully!')
    } catch (error) {
      console.error('Format error:', error)
      toast.error('Failed to format markdown')
    }
  }

  const handleMarkdownAction = (type: string, snippet: string) => {
    if (type === 'format') {
      handleFormatMarkdown()
      return
    }

    if (!editorMethods) {
      console.warn('Editor methods not available yet')
      return
    }

    if (!editorMethods.getCurrentLineContent || !editorMethods.getSelectedText) {
      console.warn('Editor methods not fully initialized')
      return
    }

    const selectedText = editorMethods.getSelectedText()

    if (selectedText) {
      let formattedText = ''

      switch (type) {
        case 'bold':
          formattedText = `**${selectedText}**`
          break
        case 'italic':
          formattedText = `*${selectedText}*`
          break
        case 'code':
          formattedText = `\`${selectedText}\``
          break
        case 'link':
          formattedText = `[${selectedText}](https://example.com)`
          break
        case 'h1':
          formattedText = `# ${selectedText}`
          break
        case 'h2':
          formattedText = `## ${selectedText}`
          break
        case 'h3':
          formattedText = `### ${selectedText}`
          break
        case 'h4':
          formattedText = `#### ${selectedText}`
          break
        case 'h5':
          formattedText = `##### ${selectedText}`
          break
        case 'h6':
          formattedText = `###### ${selectedText}`
          break
        default:
          formattedText = selectedText
      }

      editorMethods.replaceSelectedText(formattedText)
    } else {
      const currentLineContent = editorMethods.getCurrentLineContent().trim()

      if (currentLineContent === '') {
        editorMethods.insertAtCursor(snippet)
      } else {
        if (
          type === 'h1' ||
          type === 'h2' ||
          type === 'h3' ||
          type === 'h4' ||
          type === 'h5' ||
          type === 'h6'
        ) {
          let prefix = ''
          switch (type) {
            case 'h1':
              prefix = '# '
              break
            case 'h2':
              prefix = '## '
              break
            case 'h3':
              prefix = '### '
              break
            case 'h4':
              prefix = '#### '
              break
            case 'h5':
              prefix = '##### '
              break
            case 'h6':
              prefix = '###### '
              break
          }
          editorMethods.replaceCurrentLine(prefix + currentLineContent)
        } else if (type === 'quote') {
          editorMethods.replaceCurrentLine('> ' + currentLineContent)
        } else {
          let insertText = ''
          switch (type) {
            case 'bold':
              insertText = '**Bold text**'
              break
            case 'italic':
              insertText = '*Italic text*'
              break
            case 'code':
              insertText = '`inline code`'
              break
            case 'link':
              insertText = '[Link text](https://example.com)'
              break
            case 'list':
              editorMethods.replaceCurrentLine('- ' + currentLineContent)
              return
            case 'ordered':
              editorMethods.replaceCurrentLine('1. ' + currentLineContent)
              return
            default:
              insertText = snippet
          }
          editorMethods.insertAtCursor(insertText)
        }
      }
    }
  }

  const markdownSnippets = [
    { icon: Heading1, snippet: '# Heading 1', tooltip: 'Heading 1', type: 'h1' },
    { icon: Heading2, snippet: '## Heading 2', tooltip: 'Heading 2', type: 'h2' },
    { icon: Heading3, snippet: '### Heading 3', tooltip: 'Heading 3', type: 'h3' },
    { icon: Heading4, snippet: '#### Heading 4', tooltip: 'Heading 4', type: 'h4' },
    { icon: Heading5, snippet: '##### Heading 5', tooltip: 'Heading 5', type: 'h5' },
    { icon: Heading6, snippet: '###### Heading 6', tooltip: 'Heading 6', type: 'h6' },
    { icon: Bold, snippet: '**Bold text**', tooltip: 'Bold', type: 'bold' },
    { icon: Italic, snippet: '*Italic text*', tooltip: 'Italic', type: 'italic' },
    { icon: List, snippet: '- Bullet point', tooltip: 'Bullet List', type: 'list' },
    { icon: ListOrdered, snippet: '1. Numbered item', tooltip: 'Numbered List', type: 'ordered' },
    { icon: Quote, snippet: '> Quote', tooltip: 'Quote', type: 'quote' },
    { icon: Code, snippet: '`inline code`', tooltip: 'Inline Code', type: 'code' },
    { icon: Link, snippet: '[Link text](https://example.com)', tooltip: 'Link', type: 'link' },
    { icon: FileText, snippet: '', tooltip: 'Format Markdown', type: 'format' }
  ]

  return (
    <div className="fixed inset-0 flex flex-col pb-20">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">New Blog Post</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={e => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Select Image
            </label>
            {imageFile && (
              <Button onClick={handleImageUpload} disabled={isUploadingImage} size="sm">
                {isUploadingImage ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload & Copy Key'
                )}
              </Button>
            )}
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <RainbowButton>Create</RainbowButton>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Publish Blog Post</DialogTitle>
              </DialogHeader>
              <form id="blog-form" action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="header">Blog Image Header</Label>
                  <Input
                    name="header"
                    type="file"
                    accept="image/*"
                    required
                    onChange={e => setHeaderFile(e.target.files?.[0] || null)}
                  />
                  {headerFile && (
                    <div className="mt-2">
                      <Label>Header Preview</Label>
                      <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-gray-50">
                        <img
                          src={URL.createObjectURL(headerFile)}
                          alt="Header preview"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="token">Token</Label>
                  <Input name="token" placeholder="ragebaited" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input name="title" placeholder="My New Blog Post" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    name="description"
                    placeholder="A brief description of the post"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input name="category" placeholder="e.g., Technology, Lifestyle" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input name="tags" placeholder="Comma-separated tags" required />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <Tabs
          defaultValue="edit"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-1 flex-col"
        >
          <div className="mx-4 mt-4 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            {activeTab === 'edit' && (
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  {markdownSnippets.map((item, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkdownAction(item.type, item.snippet)}
                          disabled={!editorMethods || !editorMethods.getCurrentLineContent}
                          className="h-8 w-8 p-0"
                        >
                          <item.icon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            )}
          </div>

          <div className="relative flex-1 p-4">
            <div className={`absolute inset-0 ${activeTab === 'edit' ? 'visible' : 'invisible'}`}>
              <div className="relative mx-4 h-full rounded-lg border">
                <Editor onEditorReady={setEditorMethods} disabled={isUploadingImage} />

                {isUploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <p className="text-sm">Uploading image...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`absolute inset-0 ${activeTab === 'preview' ? 'visible' : 'invisible'}`}
            >
              <div className="mx-4 h-full overflow-auto rounded-lg border p-2">
                {markdown ? (
                  <MarkdownRenderer markdown={markdown} />
                ) : (
                  <div className="text-muted-foreground flex h-full items-center justify-center">
                    <p>Start typing in the editor to see the preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { createPostAction } from '@/app/blog/create/actions'
import { Editor } from '@/components/editor'
import { EditorPreview } from '@/components/editor-preview'
import { HyperText } from '@/components/magicui/hyper-text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useBlogStore } from '@/hooks/blog-store'

export default function CreateBlogPage() {
  const router = useRouter()
  const { markdown } = useBlogStore()
  const [state, formAction] = useActionState(createPostAction, { success: undefined })
  const [activeTab, setActiveTab] = useState('upload')

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message || 'Upload successful!')
      setTimeout(() => {
        router.push('/blog')
      }, 1500)
    }

    if (state.success === false && state.error) {
      toast.error('Upload failed. Please try again.', {
        description: state.error
      })
    }
  }, [state, router])

  const handleSubmit = (formData: FormData) => {
    formData.append('activeTab', activeTab)

    if (activeTab === 'create') {
      formData.append('markdown', markdown)
    }

    formAction(formData)
  }

  const [headerFile, setHeaderFile] = useState<File | null>(null)
  const [createHeaderFile, setCreateHeaderFile] = useState<File | null>(null)

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <HyperText>New Blog Post</HyperText>
      <form id="blog-form" action={handleSubmit} className="w-full">
        <Tabs
          defaultValue="upload"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input name="file" type="file" required={activeTab === 'upload'} />
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
                <div className="relative h-48 w-full overflow-hidden rounded-lg border bg-gray-50">
                  <img
                    src={URL.createObjectURL(headerFile)}
                    alt="Header preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            )}
            <Label htmlFor="token">Token</Label>
            <Input name="token" placeholder="ragebaited" type="password" />
            <Label htmlFor="title">Title</Label>
            <Input name="title" placeholder="My New Blog Post" required />
            <Label htmlFor="description">Description</Label>
            <Input name="description" placeholder="A brief description of the post" required />
            <Label htmlFor="category">Category</Label>
            <Input name="category" placeholder="e.g., Technology, Lifestyle" required />
            <Label htmlFor="tags">Tags</Label>
            <Input name="tags" placeholder="Comma-separated tags" required />
          </TabsContent>
          <TabsContent value="create" className="w-full space-y-2">
            <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-lg border">
              <ResizablePanel defaultSize={50} className="p-1">
                <Editor />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <EditorPreview />
              </ResizablePanel>
            </ResizablePanelGroup>
            <Label htmlFor="header">Blog Image Header</Label>
            <Input
              name="header"
              type="file"
              accept="image/*"
              required
              onChange={e => setCreateHeaderFile(e.target.files?.[0] || null)}
            />
            {createHeaderFile && (
              <div className="space-y-3">
                <Label>Header Preview</Label>
                <img
                  src={URL.createObjectURL(createHeaderFile)}
                  alt="Header preview"
                  className="h-48 object-contain"
                />
              </div>
            )}
            <Label htmlFor="token">Token</Label>
            <Input name="token" placeholder="ragebaited" type="password" />
            <Label htmlFor="title">Title</Label>
            <Input name="title" placeholder="My New Blog Post" required />
            <Label htmlFor="description">Description</Label>
            <Input name="description" placeholder="A brief description of the post" required />
            <Label htmlFor="category">Category</Label>
            <Input name="category" placeholder="e.g., Technology, Lifestyle" required />
            <Label htmlFor="tags">Tags</Label>
            <Input name="tags" placeholder="Comma-separated tags" required />
          </TabsContent>
        </Tabs>
      </form>
      <Button form="blog-form" type="submit">
        {activeTab === 'upload' ? 'Upload' : 'Create'}
      </Button>
    </div>
  )
}

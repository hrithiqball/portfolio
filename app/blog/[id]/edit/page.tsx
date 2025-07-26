import { BodyScrollLock } from '@/app/blog/[id]/edit/body-scroll-lock'
import { Editor } from '@/app/blog/[id]/edit/editor'
import { EditorPreview } from '@/app/blog/[id]/edit/editor-preview'
import { StoreInitializer } from '@/app/blog/[id]/edit/store-initializer'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { EditActions } from './edit-actions'

type EditBlogPageProps = { params: Promise<{ id: string }> }

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/post/${encodeURIComponent(id)}`, {
    method: 'GET'
  })
  const data = await res.json()
  const post: Blog = data?.post

  return (
    <div className="w-full">
      <BodyScrollLock />
      <div className="fixed inset-0 p-6 pt-4 pb-24">
        <StoreInitializer markdown={post?.markdown || ''} />
        <ResizablePanelGroup direction="horizontal" className="w-full h-full rounded-lg border">
          <ResizablePanel defaultSize={50}>
            <Editor />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <EditorPreview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <EditActions />
    </div>
  )
}

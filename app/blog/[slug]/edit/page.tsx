import { EditActions } from '@/app/blog/[slug]/edit/edit-actions'
import { BodyScrollLock } from '@/components/body-scroll-lock'
import { Editor } from '@/components/editor'
import { EditorPreview } from '@/components/editor-preview'
import { StoreInjector } from '@/components/injector/blog-store-initializer'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

type EditBlogPageProps = { params: Promise<{ slug: string }> }

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { slug } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/post/${slug}`)
  const data = await res.json()
  const post: Blog = data?.post

  return (
    <div className="w-full">
      <BodyScrollLock />
      <div className="fixed inset-0 p-6 pt-4 pb-24">
        <StoreInjector markdown={post?.markdown || ''} />
        <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-lg border">
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

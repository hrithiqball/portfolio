import { EditActions } from '@/app/blog/[slug]/edit/edit-actions'
import { BodyScrollLock } from '@/components/body-scroll-lock'
import { Editor } from '@/components/editor'
import { EditorPreview } from '@/components/editor-preview'
import { StoreInjector } from '@/components/injector/blog-store-initializer'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

type EditBlogPageProps = { params: Promise<{ slug: string }> }

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { slug } = await params
  let post: Blog | null = null
  const base = process.env.NEXT_PUBLIC_WORKER_URL
  if (base) {
    try {
      const res = await fetch(`${base}/post/${slug}`)
      const data = await res.json()
      post = data?.post
    } catch (error) {
      console.error('Error fetching post for edit page:', error)
    }
  } else {
    console.warn('NEXT_PUBLIC_WORKER_URL is not set; edit page will render without post data')
  }

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

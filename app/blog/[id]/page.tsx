import { CommentSection } from '@/app/blog/[id]/comment-section'
import { CmdbListener } from '@/components/cmdb-listener'
import { CmdyListener } from '@/components/cmdy-listener'
import { CopyUrl } from '@/components/copy-url'
import { Icons } from '@/components/icons'
import { HyperText } from '@/components/magicui/hyper-text'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { OpenAISummarize } from '@/components/open-ai-summarize'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type BlogPostProps = {
  params: Promise<{ id: string }>
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/post/${encodeURIComponent(id)}`, {
    method: 'GET'
  })
  const data = await res.json()
  const post: Blog = data?.post
  const tags = post.tags.split(',')
  const encodedText = encodeURIComponent(
    `Check out this blog post: ${post.title} ${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.id}`
  )

  return (
    <div className="flex justify-center">
      <CmdyListener route={`/blog/${post.id}/delete`} />
      <CmdbListener route={`/blog/${post.id}/edit`} />
      <div className="prose dark:prose-invert w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold uppercase">{post.title}</h1>
            <span className="text-sm">
              {new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
                .format(new Date(post.created_at))
                .toLowerCase()}
              - harith iqbal
            </span>
          </div>
          <OpenAISummarize />
        </div>
        <Separator className="my-4" />
        <img src={`${process.env.NEXT_PUBLIC_R2_URL}/${post.header}`} alt="header image" />
        <MarkdownRenderer markdown={post.markdown} />
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            {tags.map(tag => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="flex">
            <Button size="icon" variant="ghost" asChild>
              <a
                href={`https://wa.me/?text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.whatsapp className="size-3" />
              </a>
            </Button>
            <Button size="icon" variant="ghost">
              <a
                href={`https://x.com/intent/tweet?text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.x className="size-3" />
              </a>
            </Button>
            <CopyUrl url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.id}`} />
          </div>
        </div>
        <CommentSection slug={post.id} />
      </div>
    </div>
  )
}

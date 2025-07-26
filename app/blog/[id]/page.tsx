import Markdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { CommentSection } from '@/app/blog/[id]/comment-section'
import { CmdbListener } from '@/components/cmdb-listener'
import { CmdyListener } from '@/components/cmdy-listener'
import { CopyButton } from '@/components/copy-button'
import { CopyUrl } from '@/components/copy-url'
import { Icons } from '@/components/icons'
import { HyperText } from '@/components/magicui/hyper-text'
import { MarkdownRenderer } from '@/components/markdown-renderer'
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
        <HyperText>{post.title}</HyperText>
        <span>
          {new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
            .format(new Date(post.created_at))
            .toLowerCase()}
          - harith iqbal
        </span>
        <Separator className="my-4" />
        <MarkdownRenderer markdown={post.markdown} />
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
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

import { CopyButton } from '@/components/copy-button'
import { Icons } from '@/components/icons'
import { HyperText } from '@/components/magicui/hyper-text'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { CommentSection } from './comment-section'
import { CopyUrl } from './copy-url'
import { CmdyListener } from '@/components/cmdy-listener'

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
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
    <div className='flex justify-center'>
      <CmdyListener route={`/blog/${post.id}/delete`} />
      <div className='prose dark:prose-invert w-full'>
        <HyperText>{post.title}</HyperText>
        <span>
          {new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
            .format(new Date(post.created_at))
            .toLowerCase()}
          - harith iqbal
        </span>
        <Separator className='my-4' />
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')
              const language = match ? match[1] : ''

              return !inline && language ? (
                <div className='relative'>
                  <div className='absolute top-0 left-0 bg-gray-600 text-gray-200 px-2 py-1 text-xs rounded-tl-md rounded-br-md font-mono'>
                    {language}
                  </div>
                  <CopyButton value={String(children).replace(/\n$/, '')} />
                  <Prism
                    style={oneDark}
                    language={language}
                    PreTag='div'
                    customStyle={{
                      borderRadius: '6px',
                      fontSize: '14px',
                      paddingTop: '2rem'
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </Prism>
                </div>
              ) : (
                <span
                  className='bg-stone-100 dark:bg-stone-800 rounded px-1 font-mono font-semibold text-sm'
                  {...props}
                >
                  {children}
                </span>
              )
            }
          }}
        >
          {post.markdown}
        </ReactMarkdown>
        <div className='flex justify-between'>
          <div className='flex gap-1 items-center'>
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className='flex'>
            <Button size='icon' variant='ghost' asChild>
              <a
                href={`https://wa.me/?text=${encodedText}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icons.whatsapp className='size-3' />
              </a>
            </Button>
            <Button size='icon' variant='ghost'>
              <a
                href={`https://x.com/intent/tweet?text=${encodedText}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icons.x className='size-3' />
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

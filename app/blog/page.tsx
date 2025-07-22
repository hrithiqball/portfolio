import { HyperText } from '@/components/magicui/hyper-text'
import { PostListener } from '@/components/post-listener'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Blog() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/list`, { method: 'GET' })
  const data = await res.json()
  const blogList: Blog[] = data?.posts || []

  return (
    <div className='space-y-4 py-8'>
      <HyperText className='text-xl'>Blog</HyperText>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {blogList.map((post) => (
          <Link href={`/blog/${encodeURIComponent(post?.id)}`} key={post?.id}>
            <Card className='p-4 bg-stone-100 dark:bg-card cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105'>
              <CardHeader className='space-y-3'>
                <CardTitle className='flex items-center justify-between'>
                  <span>
                    {post?.title}
                    {/* {post.category} */}
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    {post?.created_at &&
                      new Intl.DateTimeFormat('en-GB', {
                        day: 'numeric',
                        month: 'short'
                      }).format(new Date(post.created_at))}
                  </span>
                </CardTitle>
                <div className='flex gap-1'>
                  {post.tags.split(',').map((tag) => (
                    <Badge variant='outline' key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardDescription className='line-clamp-2'>{post.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <PostListener />
    </div>
  )
}

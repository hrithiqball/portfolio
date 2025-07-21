import { PostListener } from '@/components/post-listener'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { parseFileName } from '@/lib/utils'

export default async function Blog() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/list`, { method: 'GET' })
  const data = await res.json()
  const fileList: string[] = data.files || []
  const blogList = fileList.map(parseFileName).filter(Boolean)

  return (
    <div className='space-y-4 py-8'>
      <h1 className='font-bold text-xl'>Blog</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {blogList.map((post) => (
          <Card
            key={post?.filename}
            className='p-4 bg-stone-100 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105'
          >
            <CardHeader className='space-y-3'>
              <CardTitle className='flex items-center justify-between'>
                <span>{post?.title}</span>
                <span className='text-xs text-muted-foreground'>
                  {post?.date &&
                    new Intl.DateTimeFormat('en-GB', {
                      day: 'numeric',
                      month: 'short'
                    }).format(new Date(post.date))}
                </span>
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus ipsum atque
                voluptatum officiis eum illum asperiores ut, ipsa eligendi quis veritatis officia.
                Quos iure optio et. Vitae harum libero incidunt.
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <PostListener />
    </div>
  )
}

import Link from 'next/link'

import { CmdbListener } from '@/components/cmdb-listener'
import { HyperText } from '@/components/magicui/hyper-text'
import { Meteors } from '@/components/magicui/meteors'
import { ParticleBackground } from '@/components/particle-background'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  let blogList: Blog[] = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/list`, {
      method: 'GET',
      // force-dynamic is set above; revalidate can be tuned here if desired
      next: { revalidate: 60 }
    })

    if (!res.ok) {
      // Response is not OK (404/500/etc). Log and continue with empty list.
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
    } else {
      const contentType = res.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) {
        // Sometimes an HTML error page is returned ("<!DOCTYPE ..."). Try to capture useful info.
        const text = await res.text()
        try {
          const data = JSON.parse(text)
          blogList = data?.posts || []
        } catch (e) {
          // Include the error in the log to avoid unused-variable linting and aid debugging
          console.error(
            'Expected JSON from worker but received non-JSON response:',
            e,
            text.slice(0, 500)
          )
        }
      } else {
        const data = await res.json()
        blogList = data?.posts || []
      }
    }
  } catch (err) {
    // Network or unexpected error - log and continue with empty blog list
    console.error('Error fetching blog list:', err)
    blogList = []
  }
  const groupedByCategory = blogList.reduce(
    (acc, post) => {
      const category = post.category || 'Uncategorized'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(post)
      return acc
    },
    {} as Record<string, Blog[]>
  )

  return (
    <div className="flex w-full flex-col items-center space-y-8">
      <div className="relative w-full overflow-hidden pb-12">
        <Meteors />
        <ParticleBackground />
        <HyperText className="text-center">Blog</HyperText>
        {Object.entries(groupedByCategory).map(([category, posts]) => (
          <div key={category} className="w-full space-y-4">
            <HyperText className="text-lg font-semibold">{category}</HyperText>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <Link href={`/blog/${post.slug}`} key={post?.id} className="p-4">
                  <Card className="relative h-full cursor-pointer p-4 transition-transform duration-300 ease-in-out hover:scale-105">
                    <CardHeader className="space-y-3">
                      <img
                        src={`${process.env.NEXT_PUBLIC_R2_URL}/${post.header}`}
                        className="h-48 w-full rounded object-cover"
                        alt="header"
                      />
                      <CardTitle className="flex items-center justify-between">
                        <span className="line-clamp-2">{post?.title}</span>
                        <span className="text-muted-foreground ml-2 text-xs whitespace-nowrap">
                          {post?.created_at &&
                            new Intl.DateTimeFormat('en-GB', {
                              day: 'numeric',
                              month: 'short'
                            }).format(new Date(post.created_at))}
                        </span>
                      </CardTitle>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.split(',').map(tag => (
                          <Badge variant="outline" key={tag}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <CmdbListener route="/blog/create" />
      </div>
    </div>
  )
}

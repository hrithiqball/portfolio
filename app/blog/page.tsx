import Link from 'next/link'

import { getAllPosts } from '@/lib/blog'

import { HyperText } from '@/components/magicui/hyper-text'
import { Meteors } from '@/components/magicui/meteors'
import { ParticleBackground } from '@/components/particle-background'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function BlogPage() {
  const blogList = getAllPosts()

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
                <Link href={`/blog/${post.slug}`} key={post.slug} className="p-4">
                  <Card className="relative h-full cursor-pointer p-4 transition-transform duration-300 ease-in-out hover:scale-105">
                    <CardHeader className="space-y-3">
                      <CardTitle className="flex items-center justify-between">
                        <span className="line-clamp-2">{post.title}</span>
                        <span className="text-muted-foreground ml-2 text-xs whitespace-nowrap">
                          {new Intl.DateTimeFormat('en-GB', {
                            day: 'numeric',
                            month: 'short'
                          }).format(new Date(post.date))}
                        </span>
                      </CardTitle>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map(tag => (
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
      </div>
    </div>
  )
}

import { Metadata } from 'next'

import { CommentSection } from '@/app/blog/[slug]/comment-section'
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

// Revalidate every 24 hours (86400 seconds) or set to false for full static generation
export const revalidate = 86400

type BlogPostProps = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Blog | null> {
  try {
    const base = process.env.NEXT_PUBLIC_WORKER_URL
    if (!base) {
      console.warn('NEXT_PUBLIC_WORKER_URL is not set; skipping fetch for post')
      return null
    }

    const res = await fetch(`${base}/post/${slug}`, {
      method: 'GET'
    })
    const data = await res.json()
    return data?.post || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateStaticParams() {
  const base = process.env.NEXT_PUBLIC_WORKER_URL
  if (!base) {
    console.warn('NEXT_PUBLIC_WORKER_URL is not set; skipping generateStaticParams')
    return []
  }

  try {
    const res = await fetch(`${base}/list`, {
      method: 'GET'
    })
    const data = await res.json()
    const posts: Blog[] = data?.posts || []

    return posts.map(post => ({
      slug: post.slug
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const imageUrl = `${process.env.NEXT_PUBLIC_R2_URL}/${post.header}`
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const tags = post.tags?.split(',').map(tag => tag.trim()) || []

  return {
    title: post.title,
    description: post.description,
    keywords: tags.join(', '),
    authors: [{ name: 'Harith Iqbal' }],
    creator: 'Harith Iqbal',
    publisher: 'Harith Iqbal',
    category: post.category,
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: 'Harith Iqbal Portfolio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.created_at,
      authors: ['Harith Iqbal'],
      tags: tags
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@harithiqbal', // Replace with your actual Twitter handle
      images: [imageUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    alternates: {
      canonical: postUrl
    }
  } satisfies Metadata
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className="flex justify-center">
        <div className="prose dark:prose-invert w-full">
          <h1>Blog Post Not Found</h1>
          <p>The requested blog post could not be found.</p>
        </div>
      </div>
    )
  }

  const tags = post.tags?.split(',') || []
  const encodedText = encodeURIComponent(
    `Check out this blog post: ${post.title} ${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`
  )

  return (
    <div className="flex justify-center">
      <CmdyListener route={`/blog/${post.slug}/delete`} />
      <CmdbListener route={`/blog/${post.slug}/edit`} />
      <div className="prose dark:prose-invert w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <HyperText>{post.title}</HyperText>
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
        <img src={`${process.env.NEXT_PUBLIC_R2_URL}/${post.header}`} alt="header" />
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
            <CopyUrl url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`} />
          </div>
        </div>
        <CommentSection slug={post.slug} />
      </div>
    </div>
  )
}

import { Metadata } from 'next'

import { CommentSection } from '@/app/blog/[slug]/comment-section'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

import { CopyUrl } from '@/components/copy-url'
import { Icons } from '@/components/icons'
import { HyperText } from '@/components/magicui/hyper-text'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { OpenAISummarize } from '@/components/open-ai-summarize'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type BlogPostProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const postUrl = `${baseUrl}/blog/${post.slug}`

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: 'Harith Iqbal' }],
    creator: 'Harith Iqbal',
    publisher: 'Harith Iqbal',
    category: post.category,
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: 'Harith Iqbal Portfolio',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: ['Harith Iqbal'],
      tags: post.tags,
      ...(post.header && {
        images: [{ url: post.header, width: 1200, height: 630, alt: post.title }]
      })
    },
    twitter: {
      card: post.header ? 'summary_large_image' : 'summary',
      title: post.title,
      description: post.description,
      creator: '@harithiqballll',
      ...(post.header && { images: [post.header] })
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
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className='flex justify-center'>
        <div className='prose dark:prose-invert w-full'>
          <h1>Blog Post Not Found</h1>
          <p>The requested blog post could not be found.</p>
        </div>
      </div>
    )
  }

  const encodedText = encodeURIComponent(
    `Check out this blog post: ${post.title} ${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`
  )

  return (
    <div className='flex justify-center'>
      <div className='prose dark:prose-invert w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <HyperText>{post.title}</HyperText>
            <span className='text-sm'>
              {new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
                .format(new Date(post.date))
                .toLowerCase()}
              - harith iqbal
            </span>
          </div>
          <OpenAISummarize />
        </div>
        <Separator className='my-4' />
        {post.header && <img src={post.header} alt={post.title} />}
        <MarkdownRenderer markdown={post.content} />
        <div className='flex justify-between'>
          <div className='flex items-center gap-1'>
            {post.tags.map((tag) => (
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
            <CopyUrl url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`} />
          </div>
        </div>
        <CommentSection slug={post.slug} />
      </div>
    </div>
  )
}

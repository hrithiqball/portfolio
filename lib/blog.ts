import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): Blog[] {
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        title: data.title,
        description: data.description,
        tags: data.tags || [],
        category: data.category || 'Uncategorized',
        date: data.date,
        slug,
        header: data.header,
        content
      } satisfies Blog
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): Blog | null {
  const filePath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    title: data.title,
    description: data.description,
    tags: data.tags || [],
    category: data.category || 'Uncategorized',
    date: data.date,
    slug,
    header: data.header,
    content
  } satisfies Blog
}

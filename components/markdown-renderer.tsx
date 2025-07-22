'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

type MarkdownRendererProps = {
  content: string | undefined
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
}

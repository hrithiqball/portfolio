'use client'

import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Streamdown } from 'streamdown'

type MarkdownRendererProps = {
  markdown: string | undefined
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <Streamdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
      {markdown}
    </Streamdown>
  )
}

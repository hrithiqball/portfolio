'use client'

import { MarkdownRenderer } from '@/components/markdown-renderer'
import { useBlogStore } from '@/hooks/blog-store'

export function EditorPreview() {
  const { markdown } = useBlogStore()

  return (
    <div className="prose dark:prose-invert prose-sm h-full w-full max-w-none overflow-y-auto p-4">
      <MarkdownRenderer markdown={markdown} />
    </div>
  )
}

'use client'

import { useBlogEditStore } from '@/app/blog/[id]/edit/store'
import { MarkdownRenderer } from '@/components/markdown-renderer'

export function EditorPreview() {
  const { markdown } = useBlogEditStore()

  return (
    <div className='prose dark:prose-invert prose-sm max-w-none p-4 h-full overflow-y-auto w-full'>
      <MarkdownRenderer markdown={markdown} />
    </div>
  )
}

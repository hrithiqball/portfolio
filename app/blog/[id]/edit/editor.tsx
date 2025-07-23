'use client'

import { useBlogEditStore } from '@/app/blog/[id]/edit/store'
import { Textarea } from '@/components/ui/textarea'

export function Editor() {
  const { markdown, setMarkdown } = useBlogEditStore()

  return (
    <div className='h-full'>
      <Textarea
        className='h-full'
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder='Get creative!'
      />
    </div>
  )
}

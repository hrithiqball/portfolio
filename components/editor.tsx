'use client'

import { useEffect } from 'react'

import { Textarea } from '@/components/ui/textarea'
import { useBlogStore } from '@/hooks/blog-store'

export function Editor() {
  const { markdown, setMarkdown } = useBlogStore()

  useEffect(() => {
    return () => {
      setMarkdown('')
    }
  }, [setMarkdown])

  return (
    <div className="h-full">
      <Textarea
        className="h-full"
        value={markdown}
        onChange={e => setMarkdown(e.target.value)}
        placeholder="Get creative!"
      />
    </div>
  )
}

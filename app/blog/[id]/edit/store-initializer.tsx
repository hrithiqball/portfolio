'use client'

import { useBlogEditStore } from '@/app/blog/[id]/edit/store'
import { useEffect } from 'react'

interface StoreInitializerProps {
  markdown: string
}

export function StoreInitializer({ markdown }: StoreInitializerProps) {
  const { setMarkdown } = useBlogEditStore()

  useEffect(() => {
    setMarkdown(markdown)
  }, [markdown, setMarkdown])

  return null
}

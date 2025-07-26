'use client'

import { useEffect } from 'react'

import { useBlogEditStore } from '@/app/blog/[id]/edit/store'

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

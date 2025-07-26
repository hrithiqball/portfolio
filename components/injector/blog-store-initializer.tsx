'use client'

import { useEffect } from 'react'

import { useBlogStore } from '@/hooks/blog-store'

interface StoreInjectorProps {
  markdown: string
}

export function StoreInjector({ markdown }: StoreInjectorProps) {
  const { setMarkdown } = useBlogStore()

  useEffect(() => {
    setMarkdown(markdown)
  }, [markdown, setMarkdown])

  return null
}

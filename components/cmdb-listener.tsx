'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type CmdbListenerProps = {
  route: string
}

export function CmdbListener({ route }: CmdbListenerProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault()
        router.push(route)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [router])

  return null
}

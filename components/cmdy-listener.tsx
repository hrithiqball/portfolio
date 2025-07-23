'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type CmdyListenerProps = {
  route: string
}

export function CmdyListener({ route }: CmdyListenerProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'y') {
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

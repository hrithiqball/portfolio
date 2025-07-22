'use client'

import { Button } from '@/components/ui/button'
import { Check, Link } from 'lucide-react'
import { useEffect, useState } from 'react'

export function CopyUrl({ url }: { url: string }) {
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setHasCopied(true)
  }

  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  return (
    <Button size='icon' variant='ghost' onClick={handleCopy}>
      {hasCopied ? <Check className='size-3' /> : <Link className='size-3' />}
    </Button>
  )
}

'use client'

import { CheckIcon, ClipboardIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ComponentProps, useEffect, useState } from 'react'

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  variant = 'ghost',
  ...props
}: ComponentProps<typeof Button> & {
  value: string
  src?: string
}) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot='copy-button'
          size='icon'
          variant={variant}
          className={cn(
            'bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100',
            className
          )}
          onClick={() => {
            copyToClipboard(value)
            setHasCopied(true)
          }}
          {...props}
        >
          <span className='sr-only'>Copy</span>
          {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{hasCopied ? 'Copied' : 'Copy to Clipboard'}</TooltipContent>
    </Tooltip>
  )
}

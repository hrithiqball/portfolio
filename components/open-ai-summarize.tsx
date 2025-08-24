'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Icons } from './icons'

export function OpenAISummarize() {
  const pathname = usePathname()

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : pathname

  const prompt = `Summarize and analyze ${fullUrl} \nOnly summarise the blog content.`
  const encodedPrompt = encodeURIComponent(prompt)
  const chatGPTUrl = `https://chatgpt.com/?prompt=${encodedPrompt}`

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" asChild>
            <Link href={chatGPTUrl} target="_blank" rel="noopener noreferrer">
              <Icons.openai />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Summarise with AI</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

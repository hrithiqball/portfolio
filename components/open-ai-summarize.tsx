'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Icons } from './icons'

export function OpenAISummarize() {
  const pathname = usePathname()
  const prompt = `Summarize and analyze ${pathname} \nOnly summarise the blog content.`
  const encodedPrompt = encodeURIComponent(prompt)
  const chatGPTUrl = `https://chatgpt.com/?prompt=${encodedPrompt}`

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" asChild aria-label="Summarise this page with AI">
            <Link
              href={chatGPTUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Summarise this page with AI"
            >
              <span className="sr-only">Summarise this page with AI</span>
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

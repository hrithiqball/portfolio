'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function OpenAISummarize() {
  const pathname = usePathname()

  const prompt = `Summarize and analyze ${pathname}`
  const encodedPrompt = encodeURIComponent(prompt)
  const chatGPTUrl = `https://chatgpt.com/?prompt=${encodedPrompt}`

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" asChild>
            <Link href={chatGPTUrl} target="_blank" rel="noopener noreferrer">
              <img src="/open-ai.png" className="size-4" alt="Summarize with OpenAI" />
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

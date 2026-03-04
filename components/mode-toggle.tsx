'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className="sr-only">Switch to {nextTheme} mode</span>
      <Sun className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <Moon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  )
}

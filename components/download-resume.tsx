'use client'

import { useTheme } from 'next-themes'
import { Download } from 'lucide-react'

import { RainbowButton } from './magicui/rainbow-button'

export function DownloadResume() {
  const { theme } = useTheme()

  function handleDownloadResume() {
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'harith-iqbal-resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <RainbowButton onClick={handleDownloadResume}>
      <>
        <Download />
        Download Resume
      </>
    </RainbowButton>
  )
}

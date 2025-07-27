'use client'

import { Download } from 'lucide-react'

import { RainbowButton } from '@/components/magicui/rainbow-button'

export function DownloadResume() {
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
      <Download />
      Download Resume
    </RainbowButton>
  )
}

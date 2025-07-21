'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    <Button onClick={handleDownloadResume}>
      <Download />
      Download Resume
    </Button>
  )
}

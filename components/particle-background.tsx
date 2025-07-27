'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Particles } from '@/components/magicui/particles'

export function ParticleBackground() {
  const { theme } = useTheme()
  const [color, setColor] = useState('#ffffff')

  useEffect(() => {
    setColor(theme === 'dark' || theme === 'system' ? '#ffffff' : '#000000')
  }, [theme])

  return (
    <Particles className="absolute inset-0 z-0" quantity={100} ease={80} color={color} refresh />
  )
}

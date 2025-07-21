import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Harith Iqbal - Full Stack Developer Portfolio',
    short_name: 'Harith Iqbal',
    description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  }
}

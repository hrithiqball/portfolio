import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hrithiqball.pixcel.org'
      }
    ],
    dangerouslyAllowSVG: true
  },
  serverActions: {
    bodySizeLimit: '10mb'
  }
}

export default nextConfig

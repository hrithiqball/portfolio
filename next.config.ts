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
    bodySizeLimit: '5mb'
  }
}

export default nextConfig

import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Allow iframe embedding only from trusted Innovando origins
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://reports.innovando.cl https://innovando-reports.vercel.app",
          },
        ],
      },
    ]
  },
}

export default nextConfig

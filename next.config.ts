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
          // Allow embedding in iframes from any origin
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *",
          },
          // Remove X-Frame-Options restriction (CSP frame-ancestors takes precedence in modern browsers)
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ]
  },
}

export default nextConfig

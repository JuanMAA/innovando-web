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
          // Allow iframe embedding from any Innovando / Vercel origin + localhost
          {
            key: 'Content-Security-Policy',
            value: [
              "frame-ancestors",
              "'self'",
              "https://reports.innovando.cl",
              "https://*.innovando.cl",
              "https://*.vercel.app",
              "http://localhost:*",
              "http://127.0.0.1:*",
            ].join(' '),
          },
          // Explicitly override Next.js / Vercel default SAMEORIGIN restriction
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

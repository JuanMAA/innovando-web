import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Innovando',
  description: 'Sitio web generado por Innovando.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script src="https://cdn.tailwindcss.com" async />
      </head>
      <body className="min-h-full bg-white text-gray-900 font-[family-name:var(--font-inter)]">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import './globals.css'
import { Inter } from 'next/font/google'
import { HeroUIProvider } from '@heroui/react'

export const metadata = {
  metadataBase: new URL('https://postgres-drizzle.vercel.app'),
  title: 'eTriage',
  description:
    'eTriage is a web application that helps you to triage your patients.',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <HeroUIProvider>
      <html lang="en">
        <body className={inter.variable}>{children}</body>
      </html>
    </HeroUIProvider>
  )
}

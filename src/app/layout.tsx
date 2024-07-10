import '@/styles/globals.css'

import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import ModalProvider from '@/providers/modal-provider'
import NextTopLoader from 'nextjs-toploader'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Forge',
  description:
    'Empowering innovation through artificial intelligence. Explore cutting-edge AI tools, resources, and solutions to transform your ideas into reality. Forge the future with AI',
  icons: {
    icon: '/favicon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <head>
          <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        </head>
        <body className={inter.className}>
          <NextTopLoader color='#6F5AF6' showSpinner={false} />
          {children}
          <Toaster />
          <ModalProvider />
        </body>
      </html>
    </SessionProvider>
  )
}

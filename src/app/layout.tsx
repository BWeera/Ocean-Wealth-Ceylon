import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ocean Wealth Ceylon',
  description: 'Premium Fisheries Products',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Mg6pCIdj8-WvXgdGRavb3B2D_tlLpcc8fY6ba0DVjW4" />
      </head>
      <body className="flex flex-col min-h-screen bg-gradient-to-b from-[#062b54] via-[#0a3d74] to-[#062b54] text-gray-900">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

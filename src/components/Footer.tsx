'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith('/studio')) return null;

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                <Image src="/logo.png" alt="Ocean Wealth Ceylon Logo Mark" layout="fill" objectFit="contain" />
              </div>
              <div className="relative h-8 w-48 flex items-center">
                <Image 
                  src="/Ocean%20wealth%20ceylon.png" 
                  alt="Ocean Wealth Ceylon" 
                  layout="fill" 
                  objectFit="contain" 
                  className="object-left brightness-0 invert" 
                />
              </div>
            </div>
            <p className="text-gray-400">Premium fisheries products straight from the ocean to you.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/products" className="text-gray-400 hover:text-white">Products</a></li>
              <li><a href="/process-and-quality" className="text-gray-400 hover:text-white">Process & Quality</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ocean Wealth Ceylon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex-shrink-0 font-bold text-2xl flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <span className="text-blue-900 text-xs font-black leading-none">OWC</span>
              <Image src="/logo.png" alt="Ocean Wealth Ceylon Logo" layout="fill" objectFit="contain" /> 
            </div>
            <span>Ocean Wealth Ceylon</span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link href="/" className="hover:text-blue-200 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link href="/about" className="hover:text-blue-200 px-3 py-2 rounded-md font-medium">About Us</Link>
              <Link href="/products" className="hover:text-blue-200 px-3 py-2 rounded-md font-medium">Products</Link>
              <Link href="/news" className="hover:text-blue-200 px-3 py-2 rounded-md font-medium">News</Link>
              <Link href="/events" className="hover:text-blue-200 px-3 py-2 rounded-md font-medium">Events</Link>
              <Link href="/contact" className="hover:text-blue-200 px-3 py-2 rounded-md font-medium">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

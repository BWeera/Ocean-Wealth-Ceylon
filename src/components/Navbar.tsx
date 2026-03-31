import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-2xl">
            <Link href="/">Ocean Wealth Ceylon</Link>
          </div>
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

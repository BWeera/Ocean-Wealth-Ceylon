import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-gray-800 text-xs font-black leading-none">OWC</span>
                <Image src="/logo.png" alt="Ocean Wealth Ceylon Logo" layout="fill" objectFit="contain" />
              </div>
              <h2 className="text-2xl font-bold">Ocean Wealth Ceylon</h2>
            </div>
            <p className="text-gray-400">Premium fisheries products straight from the ocean to you.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/products" className="text-gray-400 hover:text-white">Products</a></li>
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

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    // Initialize
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navbar transparent on home page before scrolling
  const isTransparent = isHome && !scrolled
  
  const navClasses = isTransparent
    ? 'bg-transparent text-white'
    : 'bg-white/80 backdrop-blur-md text-gray-900 border-b border-gray-200/50 shadow-sm'

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${navClasses}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-24'}`}>
            
            <Link href="/" className="flex-shrink-0 font-bold text-2xl flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center">
                <span className="text-blue-900 text-xs font-black leading-none">OWC</span>
                <Image src="/logo.png" alt="Ocean Wealth Ceylon Logo" layout="fill" objectFit="cover" /> 
              </div>
              <span className="hidden sm:block tracking-tight text-xl">Ocean Wealth</span>
            </Link>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <NavLink href="/" text="Home" current={pathname} transparent={isTransparent} />
                <NavLink href="/about" text="About Us" current={pathname} transparent={isTransparent} />
                <NavLink href="/products" text="Products" current={pathname} transparent={isTransparent} />
                <NavLink href="/news" text="News" current={pathname} transparent={isTransparent} />
                <NavLink href="/events" text="Events" current={pathname} transparent={isTransparent} />
                <NavLink href="/contact" text="Contact Us" current={pathname} transparent={isTransparent} />
              </div>
            </div>

          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from hiding behind the fixed navbar on non-home pages */}
      {!isHome && <div className="h-24" />}
    </>
  )
}

function NavLink({ href, text, current, transparent }: { href: string; text: string; current: string; transparent: boolean }) {
  const isActive = current === href || (href !== '/' && current.startsWith(href))
  
  return (
    <Link 
      href={href} 
      className={`px-1 py-2 font-medium text-sm transition-colors duration-200 relative group overflow-hidden ${
        isActive 
          ? (transparent ? 'text-white font-bold' : 'text-blue-600 font-bold')
          : (transparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-blue-600')
      }`}
    >
      {text}
      {/* Animated bottom underline indicator */}
      <span className={`absolute left-0 bottom-0 w-full h-[2px] rounded-full transition-transform duration-300 origin-left ${
        isActive 
          ? 'scale-x-100'
          : 'scale-x-0 group-hover:scale-x-100'
      } ${transparent ? 'bg-white' : 'bg-blue-600'}`}></span>
    </Link>
  )
}

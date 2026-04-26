'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Texturina } from 'next/font/google'

const texturina = Texturina({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] })

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide Navbar completely on the Sanity Studio route
  if (pathname.startsWith('/studio')) return null;

  const isTransparent = isHome && !scrolled && !mobileMenuOpen
  
  const navClasses = isTransparent
    ? 'bg-transparent text-white'
    : 'bg-white/90 backdrop-blur-md text-gray-900 border-b border-gray-200/50 shadow-sm'

  return (
    <>
      <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${navClasses}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled || mobileMenuOpen ? 'h-16' : 'h-24'}`}>
            
            <Link href="/" className="flex-shrink-0 font-bold text-xl sm:text-2xl flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity z-50">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center shrink-0">
                <span className="text-blue-900 text-[10px] sm:text-xs font-black leading-none z-10 hidden">OWC</span>
                <Image src="/logo.png" alt="Ocean Wealth Ceylon Logo" layout="fill" objectFit="cover" /> 
              </div>
              <span className={`tracking-tight text-lg sm:text-xl lg:text-2xl ${texturina.className}`}>Ocean Wealth Ceylon</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <NavLink href="/" text="Home" current={pathname} transparent={isTransparent} />
                <NavLink href="/about" text="About Us" current={pathname} transparent={isTransparent} />
                <NavLink href="/products" text="Products" current={pathname} transparent={isTransparent} />
                <NavLink href="/news" text="News" current={pathname} transparent={isTransparent} />
                <NavLink href="/events" text="Events" current={pathname} transparent={isTransparent} />
                <NavLink href="/contact" text="Contact Us" current={pathname} transparent={isTransparent} />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center z-50">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'}`}
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden fixed inset-x-0 top-0 bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-300 ease-in-out border-b border-gray-100 min-h-screen pt-20 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
          <div className="px-6 pt-4 pb-12 space-y-4 shadow-inner flex flex-col items-center">
            <MobileNavLink href="/" text="Home" current={pathname} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="/about" text="About Us" current={pathname} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="/products" text="Products" current={pathname} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="/news" text="News" current={pathname} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="/events" text="Events" current={pathname} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="/contact" text="Contact Us" current={pathname} onClick={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from hiding behind the fixed navbar on non-home pages */}
      {!isHome && <div className="h-20 sm:h-24" />}
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

function MobileNavLink({ href, text, current, onClick }: { href: string; text: string; current: string; onClick: () => void }) {
  const isActive = current === href || (href !== '/' && current.startsWith(href))
  
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`block w-full text-center px-3 py-4 rounded-xl text-lg font-bold transition-all ${
        isActive 
          ? 'bg-blue-50 text-blue-700 w-full shadow-sm border border-blue-100' 
          : 'text-gray-800 hover:bg-gray-50'
      }`}
    >
      {text}
    </Link>
  )
}

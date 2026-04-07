'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const images = [
  '/home_img_courusel/24239777714_101e755639_b.jpg',
  '/home_img_courusel/330031--01--1549601979.jpeg',
  '/home_img_courusel/billfish-1.jpg',
  '/home_img_courusel/Ocean%20Deli%201-512x299.jpg',
  '/home_img_courusel/pacific-bluefin-tuna-rw04-021.jpg',
  '/home_img_courusel/squid.jpg',
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative px-6 pt-14 lg:px-8 w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Images */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          <Image
            src={src}
            alt="Ocean Wealth Ceylon Premium Quality"
            fill
            className="object-cover"
            quality={90}
            priority={index === 0}
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-md">
            Fresh From the Ocean to You
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 drop-shadow">
            Ocean Wealth Ceylon bringing you the finest and freshest aquatic products meticulously sourced from the deep blue. Experience unparalleled quality for your culinary endeavors.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/products"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
            >
              Explore Products
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-white hover:text-blue-200 transition flex items-center">
              Learn more <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Carousel Indicators / Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-blue-500 w-10' : 'bg-white/50 w-3 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

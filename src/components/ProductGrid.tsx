'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Card from './Card'
import { urlFor } from '@/lib/sanity'

export default function ProductGrid({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [carouselProducts, setCarouselProducts] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Filter products that have images and pick 5 random ones
    const withImages = products.filter(p => p.image)
    const shuffled = [...withImages].sort(() => 0.5 - Math.random())
    setCarouselProducts(shuffled.slice(0, 5))
  }, [products])

  useEffect(() => {
    if (carouselProducts.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselProducts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [carouselProducts])

  return (
    <>
      {/* 5 Random Products Carousel */}
      {carouselProducts.length > 0 && (
        <div className="relative w-full h-[400px] mb-16 rounded-2xl overflow-hidden shadow-2xl bg-gray-900 group">
          {carouselProducts.map((product, idx) => (
            <div 
              key={`carousel-${product._id}`} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <Image 
                src={urlFor(product.image).width(1200).url()} 
                alt={product.name} 
                layout="fill" 
                objectFit="cover" 
                className="group-hover:scale-105 transition-transform duration-700" 
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 z-20">
                <p className="text-blue-400 font-bold mb-2 tracking-widest uppercase text-xs">{product.category}</p>
                <h3 className="text-3xl sm:text-5xl font-bold text-white mb-3 drop-shadow-lg">{product.name}</h3>
                <p className="text-gray-200 line-clamp-2 max-w-3xl text-sm sm:text-base drop-shadow">{product.description}</p>
                
                <div className="mt-6 inline-block bg-blue-600/90 backdrop-blur text-white px-5 py-2.5 rounded shadow-lg text-sm font-medium hover:bg-blue-500 transition">
                  View Details & Varieties &rarr;
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-8 right-8 z-30 flex gap-2">
            {carouselProducts.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-blue-500 w-8' : 'bg-white/50 w-2 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <Card
            key={product._id}
            title={product.name}
            category={product.category || 'Seafood'}
            description={product.description || ''}
            imageUrl={product.image ? urlFor(product.image).width(800).url() : ''}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto animate-fade-in-backdrop">
          <div className="bg-white rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-4xl w-full max-h-[90vh] overflow-y-auto mt-10 animate-fade-in-up border border-white/20 relative">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b px-6 py-5 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedProduct.name}</h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 focus:outline-none transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {/* Main Product Info */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-full md:w-1/2">
                  {selectedProduct.image ? (
                    <div className="relative h-64 w-full rounded-lg overflow-hidden">
                      <Image 
                        src={urlFor(selectedProduct.image).width(800).url()} 
                        alt={selectedProduct.name} 
                        layout="fill" 
                        objectFit="cover" 
                      />
                    </div>
                  ) : (
                    <div className="h-64 w-full bg-blue-100 flex items-center justify-center rounded-lg">No Image</div>
                  )}
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <p className="text-blue-600 font-semibold mb-2">{selectedProduct.category}</p>
                  <p className="text-gray-700 whitespace-pre-line">{selectedProduct.description}</p>
                </div>
              </div>

              {/* Sub Products Section */}
              {selectedProduct.subproducts && selectedProduct.subproducts.length > 0 && (
                <div className="mt-8 border-t pt-8">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Available Varieties</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedProduct.subproducts.map((sub: any) => (
                      <div key={sub._id} className="bg-gray-50 rounded-lg p-4 flex gap-4 border">
                        <div className="w-24 h-24 flex-shrink-0 relative rounded-md overflow-hidden bg-white">
                          {sub.image ? (
                            <Image 
                              src={urlFor(sub.image).width(200).url()} 
                              alt={sub.name} 
                              layout="fill" 
                              objectFit="cover" 
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">No Image</div>
                          )}
                        </div>
                        <div className="text-left flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">{sub.name}</h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{sub.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

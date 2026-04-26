'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Card from './Card'
import { urlFor } from '@/lib/sanity'

export default function ProductGrid({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [carouselProducts, setCarouselProducts] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  // Inquiry Form State
  const [showInquiry, setShowInquiry] = useState(false)
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState(false)
  const [selectedSubProducts, setSelectedSubProducts] = useState<string[]>([])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedProduct(null)
      setIsClosing(false)
      // Reset inquiry state
      setShowInquiry(false)
      setInquirySuccess(false)
      setSelectedSubProducts([])
    }, 300) // Match the animation duration
  }

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInquiryLoading(true)
    
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      
      const payload = {
        name: `${formData.get('first-name')} ${formData.get('last-name')}`,
        email: formData.get('email'),
        company: formData.get('company'),
        message: formData.get('message'),
        source: 'Product Inquiry Popup',
        details: `Main Product: ${selectedProduct?.name}\nSelected Varieties: ${selectedSubProducts.length > 0 ? selectedSubProducts.join(', ') : 'None specified'}`,
      }

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setInquirySuccess(true)
        form.reset()
        // Auto close after success
        setTimeout(() => {
          handleClose()
        }, 3000)
      } else {
        alert('Failed to send inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setInquiryLoading(false)
    }
  }

  const toggleSubProduct = (subName: string) => {
    setSelectedSubProducts(prev => 
      prev.includes(subName) ? prev.filter(n => n !== subName) : [...prev, subName]
    )
  }

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
        <div 
          className={`fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 overflow-y-auto ${isClosing ? 'animate-fade-out-backdrop' : 'animate-fade-in-backdrop'}`}
          onClick={handleClose}
        >
          <div 
            className={`bg-blue-50/95 w-full sm:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-blue-100/80 backdrop-blur-sm ${showInquiry ? 'max-w-6xl' : 'max-w-4xl'} transition-all duration-500 ease-in-out relative flex flex-col ${isClosing ? 'animate-fade-out-down' : 'animate-fade-in-up'}`} 
            style={{ maxHeight: '95vh', height: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="sticky top-0 bg-blue-100/90 backdrop-blur-md border-b border-blue-200/70 px-4 py-4 sm:px-6 sm:py-5 flex justify-between items-center z-20 flex-shrink-0 sm:rounded-t-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2 sm:gap-3">
                {showInquiry && (
                  <button 
                    onClick={() => setShowInquiry(false)}
                    className="flex items-center text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-full"
                    title="Back to Product Details"
                  >
                    &larr; Back
                  </button>
                )}
                {showInquiry ? "Send Inquiry" : (
                   <span className="truncate max-w-[200px] sm:max-w-full">{selectedProduct.name}</span>
                )}
              </h2>
              <button 
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 hover:text-white hover:bg-blue-600 focus:outline-none transition-colors border border-blue-200 ml-2 shadow-sm"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-0 overflow-x-hidden overflow-y-auto flex-grow flex flex-col relative w-full h-full custom-scrollbar">
              <div 
                className={`relative flex w-[200%] transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] h-full ${showInquiry ? '-translate-x-1/2' : 'translate-x-0'}`}
              >
                
                {/* --- Left View (Product Details) --- */}
                <div className="w-[50%] max-w-4xl mx-auto px-4 py-6 md:p-8 flex-shrink-0">
                  {/* Main Product Info */}
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
                    <div className="w-full lg:w-1/2">
                      {selectedProduct.image ? (
                        <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                          <Image 
                            src={urlFor(selectedProduct.image).width(1000).url()} 
                            alt={selectedProduct.name} 
                            layout="fill" 
                            objectFit="cover"
                            className="hover:scale-105 transition-transform duration-700 ease-in-out" 
                          />
                        </div>
                      ) : (
                        <div className="h-[300px] md:h-[400px] w-full bg-blue-50 flex items-center justify-center rounded-2xl shadow-inner border border-gray-100">
                          <span className="text-gray-400 font-medium">No Image Available</span>
                        </div>
                      )}
                    </div>
                    <div className="w-full lg:w-1/2 text-left flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm border border-blue-100">
                          {selectedProduct.category}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        {selectedProduct.name}
                      </h3>
                      <div className="prose prose-blue prose-lg text-gray-600 leading-relaxed">
                        <p className="whitespace-pre-line">{selectedProduct.description}</p>
                      </div>
                      
                      <div className="mt-8">
                        <button 
                          onClick={() => setShowInquiry(true)}
                          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-blue-500/30 w-full sm:w-auto"
                        >
                          Inquire About This Product
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sub Products Section */}
                  {selectedProduct.subproducts && selectedProduct.subproducts.length > 0 && (
                    <div className="mt-12 border-t border-gray-100 pt-10">
                      <div className="flex items-center gap-3 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Available Varieties</h3>
                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">{selectedProduct.subproducts.length}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedProduct.subproducts.map((sub: any) => (
                          <div key={sub._id} className="bg-blue-50/90 rounded-xl p-5 flex flex-col sm:flex-row gap-5 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                            <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 relative rounded-lg overflow-hidden bg-blue-100/40 border border-blue-100">
                              {sub.image ? (
                                <Image 
                                  src={urlFor(sub.image).width(400).url()} 
                                  alt={sub.name} 
                                  layout="fill" 
                                  objectFit="cover"
                                  className="group-hover:scale-110 transition-transform duration-500" 
                                />
                              ) : (
                                <div className="w-full h-full bg-blue-100/40 flex items-center justify-center text-xs text-gray-500 font-medium">No Image</div>
                              )}
                            </div>
                            <div className="text-left flex-1 flex flex-col justify-center">
                              <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors mb-2">{sub.name}</h4>
                              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{sub.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* --- Right View (Inquiry Form) --- */}
                <div className="w-[50%] max-w-6xl mx-auto flex-shrink-0 px-4 py-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-full">
                    
                    {/* Inquiry Left Pane (Context) */}
                    <div className="lg:col-span-2 bg-blue-50 rounded-2xl p-5 md:p-8 border border-blue-100 flex flex-col">
                      <h4 className="text-xl font-bold tracking-tight text-gray-900 mb-6">Inquiring About</h4>
                      
                      {/* Show current selected main product context */}
                      <div className="bg-blue-50/90 rounded-xl p-4 shadow-sm border border-blue-100 mb-8 flex items-center gap-4">
                        <div className="w-20 h-20 flex-shrink-0 rounded-lg relative overflow-hidden bg-gray-100">
                          {selectedProduct.image && (
                             <Image src={urlFor(selectedProduct.image).width(200).url()} alt={selectedProduct.name} layout="fill" objectFit="cover" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs uppercase text-blue-600 font-bold mb-1 tracking-wider">{selectedProduct.category}</p>
                          <h5 className="font-bold text-gray-900 text-lg leading-tight">{selectedProduct.name}</h5>
                        </div>
                      </div>

                      {/* Manual Checkbox Selection for Subproducts */}
                      {selectedProduct.subproducts && selectedProduct.subproducts.length > 0 && (
                        <div className="flex flex-col flex-grow">
                          <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Select Specific Products</p>
                          <div className="space-y-3 overflow-y-auto max-h-[300px] lg:max-h-[400px] pr-2 custom-scrollbar">
                            {selectedProduct.subproducts.map((sub: any) => (
                              <label key={sub._id} className="flex items-center gap-3 p-3 bg-blue-50/90 border border-blue-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors shadow-sm">
                                <input 
                                  type="checkbox" 
                                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                  checked={selectedSubProducts.includes(sub.name)}
                                  onChange={() => toggleSubProduct(sub.name)}
                                />
                                <div className="flex items-center gap-3">
                                  {sub.image && (
                                     <div className="w-10 h-10 rounded overflow-hidden relative flex-shrink-0 bg-gray-100">
                                        <Image src={urlFor(sub.image).width(100).url()} alt={sub.name} layout="fill" objectFit="cover" />
                                     </div>
                                  )}
                                  <span className="font-medium text-gray-900 text-sm">{sub.name}</span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Inquiry Right Pane (Form Inputs) */}
                    <div className="lg:col-span-3 bg-blue-50/70 p-2 rounded-xl border border-blue-100/70">
                       <form onSubmit={handleInquirySubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First name <span className="text-red-500">*</span></label>
                            <input name="first-name" type="text" required className="w-full rounded-lg border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last name <span className="text-red-500">*</span></label>
                            <input name="last-name" type="text" required className="w-full rounded-lg border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email address <span className="text-red-500">*</span></label>
                          <input name="email" type="email" required className="w-full rounded-lg border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company/Organization <span className="text-gray-400 font-normal">(Optional)</span></label>
                          <input name="company" type="text" className="w-full rounded-lg border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all" />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Message / Requirements <span className="text-red-500">*</span></label>
                          {/* Auto-injected context info into the textarea placeholder */}
                          <textarea 
                            name="message"
                            rows={4} 
                            required 
                            className="w-full rounded-lg border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 outline-none transition-all resize-none"
                            placeholder="Please provide details about expected volume, destination, or specific preparation requests..."
                          ></textarea>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row justify-between gap-4 items-center border-t border-gray-100">
                          <p className="text-xs text-gray-500 text-center sm:text-left">Your inquiry details will be processed securely.</p>
                          <button
                            type="submit"
                            disabled={inquiryLoading || inquirySuccess}
                            className={`inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-all w-full sm:w-auto ${inquiryLoading || inquirySuccess ? 'opacity-80 cursor-not-allowed transform-none' : ''}`}
                          >
                            {inquiryLoading ? (
                              <div className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                              </div>
                            ) : inquirySuccess ? (
                              <div className="flex items-center gap-2 text-green-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                Sent Successfully!
                              </div>
                            ) : 'Submit Inquiry'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

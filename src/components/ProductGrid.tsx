'use client'

import { useState } from 'react'
import Image from 'next/image'
import Card from './Card'
import { urlFor } from '@/lib/sanity'

export default function ProductGrid({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)

  return (
    <>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mt-10">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-800 focus:outline-none text-3xl font-bold leading-none"
              >
                &times;
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

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

export default function NewsGrid({ newsItems }: { newsItems: any[] }) {
  const [selectedNews, setSelectedNews] = useState<any | null>(null);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16 relative z-10">
        {newsItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-md animate-fade-in-up">
            <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">No news yet</h3>
            <p className="text-gray-500 mt-2">Check back soon for the latest articles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item: any, idx: number) => (
              <div 
                key={item._id} 
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => setSelectedNews(item)}
              >
                <div className="relative h-60 w-full bg-gray-100 overflow-hidden">
                  {item.image ? (
                    <Image 
                      src={urlFor(item.image).width(800).url()} 
                      alt={item.title} 
                      layout="fill" 
                      objectFit="cover" 
                      className="group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwbDhfOCA4Xzh6TS04IDBMOCAxNkwxNiA4eiIgZmlsbD0iI2YyZjJmMiIgZmlsbC1vcGFjaXR5PSIwLjUiIC8+Cjwvc3ZnPg==')]">
                      <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}
                  {item.date && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm shadow-sm text-blue-900 px-3 py-1.5 rounded-lg text-xs font-bold border border-white/50">
                      {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {item.content}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700">
                    Read article 
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* News Popup Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center animate-fade-in-backdrop">
          <div 
            className="absolute inset-0 bg-gray-900/60" 
            onClick={() => setSelectedNews(null)}
          ></div>
          <div className="bg-white w-full sm:w-[90vw] md:w-[700px] max-h-[90vh] sm:rounded-2xl shadow-2xl relative z-10 animate-fade-in-up flex flex-col overflow-hidden sm:m-4">
            
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={() => setSelectedNews(null)}
                className="bg-white/80 backdrop-blur-md text-gray-800 hover:text-red-500 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border border-gray-200 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-grow">
              {selectedNews.image && (
                <div className="w-full h-[250px] sm:h-[350px] relative">
                  <Image 
                    src={urlFor(selectedNews.image).width(1200).url()} 
                    alt={selectedNews.title} 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
              )}
              
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    News Update
                  </span>
                  {selectedNews.date && (
                    <span className="text-gray-500 text-sm font-semibold flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(selectedNews.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {selectedNews.title}
                </h2>
                
                <div className="prose prose-blue prose-lg max-w-none text-gray-600">
                  <p className="whitespace-pre-line leading-relaxed">{selectedNews.content}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedNews(null)}
                className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
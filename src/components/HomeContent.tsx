'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { motion } from 'framer-motion';

export default function HomeContent({ products, newsItems }: { products: any[], newsItems: any[] }) {
  const [carouselProducts, setCarouselProducts] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Take top 5 news items
  const recentNews = newsItems.slice(0, 5);

  useEffect(() => {
    // Filter products that have images and pick 5 random ones
    const withImages = products.filter(p => p.image);
    const shuffled = [...withImages].sort(() => 0.5 - Math.random());
    setCarouselProducts(shuffled.slice(0, 5));
  }, [products]);

  useEffect(() => {
    if (carouselProducts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselProducts]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center pb-24 overflow-hidden">
      <div className="w-full max-w-7xl px-6 lg:px-8 mt-16 sm:mt-24 space-y-24 sm:space-y-32">
        
        {/* --- SECTION 1: Random 5 Products Carousel --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row shadow-sm sm:shadow-none bg-white sm:bg-transparent rounded-2xl p-6 sm:p-0 items-center justify-between border sm:border-none border-gray-100">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Featured Catch</h2>
              <p className="mt-2 text-lg text-gray-600">Discover some of our premium quality seafood available for immediate export.</p>
            </div>
            <Link href="/products" className="mt-4 sm:mt-0 inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition">
              View all products <span aria-hidden="true" className="ml-1">&rarr;</span>
            </Link>
          </div>

          {carouselProducts.length > 0 && (
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 group ring-1 ring-black/5">
              {carouselProducts.map((product, idx) => (
                <div 
                  key={`carousel-${product._id}`} 
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image 
                    src={urlFor(product.image).width(1200).url()} 
                    alt={product.name} 
                    layout="fill" 
                    objectFit="cover" 
                    className="group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/20 to-transparent"></div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 z-20">
                    <p className="text-blue-400 font-bold mb-2 tracking-widest uppercase text-xs backdrop-blur-sm inline-block px-2 py-0.5 bg-blue-900/30 border border-blue-400/20 rounded shadow-sm">{product.category}</p>
                    <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 drop-shadow-lg tracking-tight">{product.name}</h3>
                    <p className="text-gray-200 line-clamp-2 max-w-3xl text-sm sm:text-base drop-shadow-md mb-6">{product.description}</p>
                    
                    <Link href="/products" className="inline-block bg-blue-600 backdrop-blur text-white px-6 py-3 rounded-lg shadow-lg shadow-blue-600/30 text-sm font-bold hover:bg-blue-500 hover:-translate-y-0.5 transition-all">
                      Browse full catalog &rarr;
                    </Link>
                  </div>
                </div>
              ))}
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-8 right-8 z-30 flex gap-2.5 bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                {carouselProducts.map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === currentSlide ? 'bg-blue-400 w-8 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-white/40 w-2 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.section>

        {/* --- SECTION 2: Latest News --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Latest Updates</h2>
              <p className="mt-2 text-lg text-gray-600">Company announcements and industry insights.</p>
            </div>
            <Link href="/news" className="mt-4 sm:mt-0 inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition">
              Read all news <span aria-hidden="true" className="ml-1">&rarr;</span>
            </Link>
          </div>

          {recentNews.length === 0 ? (
            <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-100">No news articles published yet.</div>
          ) : (
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {recentNews.map((item, idx) => (
                <motion.div 
                  key={item._id} 
                  variants={fadeInUp}
                  className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${idx === 0 ? 'md:col-span-2 lg:col-span-2 md:flex-row' : ''}`}
                >
                  <div className={`relative w-full bg-gray-100 overflow-hidden shrink-0 ${idx === 0 ? 'h-60 md:h-full md:w-1/2' : 'h-52'}`}>
                    {item.image ? (
                      <Image 
                        src={urlFor(item.image).width(800).url()} 
                        alt={item.title} 
                        layout="fill" 
                        objectFit="cover" 
                        className="group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                        <span className="text-sm font-medium">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow relative justify-center bg-white z-10 w-full">
                    {item.date && (
                      <p className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-3">
                        {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    )}
                    <h3 className={`font-extrabold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight ${idx === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm sm:text-base">
                      {item.content}
                    </p>
                    <div className="mt-auto border-t border-gray-100 pt-4 flex items-center text-sm font-bold text-blue-600">
                      <Link href="/news" className="flex items-center hover:text-blue-800">
                        Read more 
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* --- SECTION 3: Food Safety Standards & Certifications --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="relative bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-100"
        >
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-green-50 rounded-full blur-3xl opacity-60"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 relative z-10">
            <div className="lg:col-span-2 bg-blue-900 text-white p-10 sm:p-14 flex flex-col justify-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-800/80 mb-8 border border-blue-700 shadow-inner">
                <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 drop-shadow-sm">Global Food Safety Standards</h2>
              <p className="text-blue-100 text-lg leading-relaxed font-light">
                We adhere to the strictest international guidelines. From ocean to plate, every step of our supply chain guarantees purity, sustainability, and absolute freshness.
              </p>
            </div>
            
            <div className="lg:col-span-3 p-10 sm:p-14 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { 
                  title: 'HACCP Compliant', 
                  desc: 'Hazard Analysis Critical Control Point protocols integrated into our daily flow.',
                  icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' 
                },
                { 
                  title: 'EU Approved Processing', 
                  desc: 'Facilities regulated strictly to meet stringent European Union seafood export legislation.',
                  icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                },
                { 
                  title: 'BRC Certified', 
                  desc: 'A benchmark for best practice across safe food processing globally.',
                  icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                },
                { 
                  title: 'Cold Chain Integrity', 
                  desc: 'Automated 24/7 temperature monitoring keeping products optimally preserved.',
                  icon: 'M13 10V3L4 14h7v7l9-11h-7z'
                },
              ].map((cert, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition duration-300"
                >
                  <svg className="w-8 h-8 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cert.icon} />
                  </svg>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">{cert.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}

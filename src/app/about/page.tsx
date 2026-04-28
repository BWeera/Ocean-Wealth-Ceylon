import Image from 'next/image'
import Link from 'next/link'
import AboutHeroCarousel from '@/components/AboutHeroCarousel'

export default function AboutPage() {
  return (
    <div className="bg-transparent">
      {/* Hero Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <AboutHeroCarousel />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
            About Ocean Wealth Ceylon
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-50 max-w-2xl mx-auto drop-shadow-md font-medium">
            Discover the passion and dedication behind Sri Lanka's premium fisheries exporter. We are committed to delivering the freshest catch from the deep blue directly to your table.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6 drop-shadow-sm">
              Our Story
            </h2>
            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
              Founded on the pristine shores of Sri Lanka, Ocean Wealth Ceylon was born from a deep respect for the ocean and a desire to share its bounties with the world. Over the years, we have grown from a small local operation into a trusted exporter of premium aquatic products.
            </p>
            <p className="text-lg text-blue-100 leading-relaxed">
              Our journey is defined by our unwavering commitment to sustainable fishing practices, supporting local fishing communities, and ensuring that every product we deliver meets the highest standards of quality and freshness.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="/aboutus.png" 
              alt="About Ocean Wealth Ceylon" 
              layout="fill" 
              objectFit="cover" 
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-blue-950/25 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
            <div className="bg-blue-50/90 p-10 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To Deliver the finest quality seafoods while empowering local communities with sustainable development and preserving the Marine ecosystem for future generations.
              </p>
            </div>
            <div className="bg-blue-50/90 p-10 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the globally recognized symbol of trust and excellence with the unmatched taste in the fisheries industry of Ceylon's Oceans.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-950/15 py-24">
        <div className="mx-auto max-w-4xl text-center px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6 drop-shadow-sm">
            Ready to experience the difference?
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Explore our wide range of premium products or get in touch with us to discuss your specific requirements.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              View Products
            </Link>
            <Link href="/contact" className="bg-blue-50 text-blue-700 border border-blue-100 px-8 py-3 rounded-md font-medium hover:bg-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

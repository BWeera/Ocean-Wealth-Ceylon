import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 pb-10">
          {/* Subtle pattern or gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 opacity-90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            About Ocean Wealth Ceylon
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-100 max-w-2xl mx-auto">
            Discover the passion and dedication behind Sri Lanka's premium fisheries exporter. We are committed to delivering the freshest catch from the deep blue directly to your table.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded on the pristine shores of Sri Lanka, Ocean Wealth Ceylon was born from a deep respect for the ocean and a desire to share its bounties with the world. Over the years, we have grown from a small local operation into a leading exporter of premium aquatic products.
            </p>
            <p className="text-lg text-gray-600">
              Our journey is defined by our unwavering commitment to sustainable fishing practices, supporting local fishing communities, and ensuring that every product we deliver meets the highest standards of quality and freshness.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Placeholder for an about image */}
            <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
              <span className="text-blue-500 font-medium">Add an image here (e.g., from public folder)</span>
            </div>
            {/* Uncomment and add actual image later 
            <Image 
              src="/home_img_courusel/24239777714_101e755639_b.jpg" 
              alt="Fishermen working" 
              layout="fill" 
              objectFit="cover" 
            />
            */}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To sustainably harvest and deliver the finest quality seafood while empowering local communities and preserving the marine ecosystem for future generations.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the globally recognized symbol of trust and excellence in the fisheries industry, connecting the world through the unmatched taste of Ceylon's oceans.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-4xl text-center px-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            Ready to experience the difference?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Explore our wide range of premium products or get in touch with us to discuss your specific requirements.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              View Products
            </Link>
            <Link href="/contact" className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

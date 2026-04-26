import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'Process and Quality | Ocean Wealth Ceylon',
  description: 'Learn about our sustainable fish processing methods and strict quality control standards.',
};

export default function ProcessAndQualityPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Process and Quality
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Our commitment to sustainable fishing, hygienic processing, and uncompromising quality standards.
          </p>
        </div>

        <div className="mx-auto max-w-4xl mb-16 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          <div className="relative h-64 sm:h-96 w-full">
            <Image 
              src="/process.jpg" 
              alt="Fish Processing at Ocean Wealth Ceylon" 
              layout="fill" 
              objectFit="cover" 
              className="object-center" 
              priority
            />
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-16">
          {/* Fish Process Section */}
          <section className="bg-gray-50 p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </span>
              Fish Process
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Fish are purchased from Company registered agents or sometimes company owned boats using the most sustainable method and the best techniques possible such as short long lining to target the fish we want to catch which also ensure that unwanted bycatch (like Dolphins) is largely avoided.
              </p>
              <p>
                The fish is transported in refrigerated trucks as per the company requirements and at receiving good are checked same as company goods and only acceptable goods are received. For each lot boat details are received from the suppliers. Time to time company representatives do inspection on boats (Company own suppliers and contractors) to check its hygienic conditions and operations.
              </p>
              <p>
                Processing is done under intrinsically hygienic conditions maintaining temperature below 40°C through out the processing line.
              </p>
            </div>
          </section>

          {/* Quality Control Section */}
          <section className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              Quality Control
            </h2>
            <div className="text-lg text-gray-600 leading-relaxed">
              <p>
                Our export products are packed in EU approved factories adhering supermarket standards. All the products are prepared according to the HACCP manual and steps, in the ISO 22000 certified fish processing factory.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
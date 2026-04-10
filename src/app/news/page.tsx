import { client, urlFor } from '@/lib/sanity'
import { newsQuery } from '@/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import NewsGrid from '@/components/NewsGrid'

export const revalidate = 0 // Disable cache to show updates instantly

export default async function NewsPage() {
  const newsItems = await client.fetch(newsQuery)

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative bg-blue-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/ocean-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center animate-fade-in-up">
          <span className="inline-block bg-blue-500/20 text-blue-100 border border-blue-400/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">Updates & Media</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-sm">
            Latest News
          </h2>
          <p className="mt-6 text-xl leading-8 text-blue-100 max-w-2xl mx-auto font-light">
            Stay up to date with the newest catches, company announcements, and milestones from Ocean Wealth Ceylon.
          </p>
        </div>
      </div>

      <NewsGrid newsItems={newsItems} />
    </div>
  )
}

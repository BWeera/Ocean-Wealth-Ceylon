import { client, urlFor } from '@/lib/sanity'
import { newsQuery } from '@/lib/queries'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export default async function NewsPage() {
  const newsItems = await client.fetch(newsQuery)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest News
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Stay up to date with the latest caught, company announcements, and events in Ocean Wealth Ceylon.
          </p>
        </div>
        
        {newsItems.length === 0 ? (
          <div className="text-center text-gray-500">No news articles found yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item: any) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="relative h-48 w-full bg-gray-100">
                  {item.image ? (
                    <Image 
                      src={urlFor(item.image).width(800).url()} 
                      alt={item.title} 
                      layout="fill" 
                      objectFit="cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  {item.date && (
                    <p className="text-sm text-blue-600 font-semibold mb-2">
                      {new Date(item.date).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

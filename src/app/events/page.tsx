import { client, urlFor } from '@/lib/sanity'
import { eventsQuery } from '@/lib/queries'
import Image from 'next/image'

export const revalidate = 0 // Disable cache to show updates instantly

export default async function EventsPage() {
  const events = await client.fetch(eventsQuery)

  return (
    <div className="bg-transparent min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative bg-blue-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/ocean-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center animate-fade-in-up">
          <span className="inline-block bg-blue-500/20 text-blue-100 border border-blue-400/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">Join Us</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-sm">
            Events & Exhibitions
          </h2>
          <p className="mt-6 text-xl leading-8 text-blue-100 max-w-2xl mx-auto font-light">
            Connect with us at upcoming trade shows and exhibitions to experience Ocean Wealth Ceylon's premium products directly.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 lg:px-8 -mt-16 relative z-10">
        
        <div className="space-y-6">
          {events.map((event: any, idx: number) => {
            const eventDate = event.date ? new Date(event.date) : null;
            return (
              <div 
                key={event._id} 
                className="group bg-blue-50/90 rounded-2xl shadow-sm border border-blue-100 p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start animate-fade-in-up backdrop-blur-sm"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Date Box (Only shown if event date exists) */}
                {eventDate && (
                  <div className="flex-shrink-0 w-full sm:w-32 bg-blue-50 rounded-xl p-4 text-center border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                    <span className="block text-sm font-bold text-blue-600 uppercase tracking-wider group-hover:text-blue-100 transition-colors">
                      {eventDate.toLocaleString('en-US', { month: 'short' })}
                    </span>
                    <span className="block text-4xl sm:text-5xl font-black text-blue-900 my-1 group-hover:text-white transition-colors">
                      {eventDate.getDate()}
                    </span>
                    <span className="block text-xs font-semibold text-gray-500 group-hover:text-blue-200 transition-colors">
                      {eventDate.getFullYear()}
                    </span>
                  </div>
                )}

                <div className="flex-1 flex flex-col justify-center h-full w-full">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 text-sm font-bold text-blue-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Ocean Wealth Ceylon</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{event.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line group-hover:text-gray-800 transition-colors">{event.description}</p>
                    </div>
                    {event.image && (
                      <div className="w-full lg:w-1/3 xl:w-[250px] shrink-0 h-[200px] lg:h-auto min-h-[150px] relative rounded-xl overflow-hidden shadow-sm border border-blue-100 mt-4 lg:mt-0">
                        <Image 
                          src={urlFor(event.image).width(600).url()} 
                          alt={event.title} 
                          layout="fill" 
                          objectFit="cover" 
                          className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          
          {events.length === 0 && (
            <div className="bg-blue-50/90 rounded-3xl p-16 text-center shadow-md animate-fade-in-up border border-blue-100 backdrop-blur-sm">
              <div className="w-20 h-20 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No upcoming events</h3>
              <p className="text-gray-500 text-lg">We don't have any trade shows or exhibitions scheduled right now. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { client } from '@/lib/sanity'
import { eventsQuery } from '@/lib/queries'

export const revalidate = 60

export default async function EventsPage() {
  const events = await client.fetch(eventsQuery)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Events & Exhibitions
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Join us at our upcoming events to experience Ocean Wealth Ceylon's premium products directly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2 text-blue-600 font-semibold mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {event.date ? new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'Date TBD'}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
              <p className="text-gray-600 whitespace-pre-line line-clamp-4">{event.description}</p>
            </div>
          ))}
          
          {events.length === 0 && (
             <div className="col-span-full text-center text-gray-500 py-10">
               No upcoming events at the moment. Please check back later!
             </div>
          )}
        </div>
      </div>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  title: string
  description: string
  imageUrl: string
  href?: string
  onClick?: () => void
  category: string
}

export default function Card({ title, description, imageUrl, href, onClick, category }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-1">
      <div className="relative h-56 w-full overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            layout="fill" 
            objectFit="cover" 
            className="group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-blue-50 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 relative">
        <p className="text-xs text-blue-600 font-bold mb-2 uppercase tracking-wide">{category}</p>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2 text-sm">{description}</p>
        
        {onClick ? (
          <button 
            onClick={onClick}
            className="inline-flex items-center justify-center space-x-2 w-full bg-gray-50 text-blue-700 border border-blue-100 px-4 py-2.5 rounded-lg font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 cursor-pointer group/btn"
          >
            <span>View Details</span>
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        ) : href ? (
          <Link 
            href={href}
            className="inline-flex items-center justify-center space-x-2 w-full bg-gray-50 text-blue-700 border border-blue-100 px-4 py-2.5 rounded-lg font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group/btn"
          >
            <span>View Details</span>
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        ) : null}
      </div>
    </div>
  )
}


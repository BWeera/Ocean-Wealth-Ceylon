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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        ) : (
          <div className="w-full h-full bg-blue-100 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-sm text-blue-600 font-semibold mb-2">{category}</p>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        {onClick ? (
          <button 
            onClick={onClick}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition cursor-pointer text-left"
          >
            View Details
          </button>
        ) : href ? (
          <Link 
            href={href}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        ) : null}
      </div>
    </div>
  )
}


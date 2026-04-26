import { client, urlFor } from '@/lib/sanity'
import { productBySlugQuery } from '@/lib/queries'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Params {
  params: {
    slug: string
  }
}

export const revalidate = 0

export default async function ProductDetails({ params: { slug } }: Params) {
  const product = await client.fetch(productBySlugQuery, { slug })

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-transparent">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 bg-white/95 rounded-2xl shadow-xl py-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <div className="flex flex-col-reverse">
              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                {product.image ? (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    width={800}
                    height={600}
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <div className="mt-3">
                <p className="text-3xl tracking-tight text-blue-600 font-semibold">{product.category}</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-base text-gray-700">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="mt-10 flex">
                <a
                  href="/contact"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Inquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

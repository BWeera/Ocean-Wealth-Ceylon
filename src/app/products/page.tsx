import { client } from '@/lib/sanity'
import { productsQuery } from '@/lib/queries'
import ProductGrid from '@/components/ProductGrid'

// App Router fetching
export const revalidate = 0 // Revalidate on every request (No cache)

export default async function ProductsPage() {
  const products = await client.fetch(productsQuery)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Premium Products
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Browse through our wide variety of carefully harvested and processed fish and seafood.
          </p>
        </div>
        
        <ProductGrid products={products} />
      </div>
    </div>
  )
}


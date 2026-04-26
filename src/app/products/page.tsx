import { client } from '@/lib/sanity'
import { productsQuery } from '@/lib/queries'
import ProductGrid from '@/components/ProductGrid'

// App Router fetching
export const revalidate = 0 // Revalidate on every request (No cache)

export default async function ProductsPage() {
  const products = await client.fetch(productsQuery)

  // Custom sort based on client's priority list
  const priorityList = [
    'lobster',
    'shrimps and prawns',
    'crabs',
    'tuna',
    'grouper',
    'sword fish',
    'mahi mahi',
    'marlin fish',
    'seer fish'
  ];

  const sortedProducts = [...products].sort((a, b) => {
    const nameA = (a.name || '').toLowerCase().trim();
    const nameB = (b.name || '').toLowerCase().trim();

    const getIndex = (name: string) => {
      const idx = priorityList.findIndex(item => name.includes(item));
      return idx !== -1 ? idx : priorityList.length; // 'Others' naturally fall at the end
    };

    const indexA = getIndex(nameA);
    const indexB = getIndex(nameB);

    return indexA - indexB;
  });

  return (
    <div className="bg-transparent min-h-screen pb-24">
      <div className="relative bg-blue-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/ocean-bg.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center animate-fade-in-up">
          <span className="inline-block bg-blue-500/20 text-blue-100 border border-blue-400/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">Fresh Selection</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-sm">
            Our Premium Products
          </h2>
          <p className="mt-6 text-xl leading-8 text-blue-100 max-w-2xl mx-auto font-light">
            Browse through our wide variety of carefully harvested and processed fish and seafood.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16 relative">
        <ProductGrid products={sortedProducts} />
      </div>
    </div>
  )
}


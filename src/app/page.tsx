import HeroCarousel from '@/components/HeroCarousel'
import HomeContent from '@/components/HomeContent'
import { client } from '@/lib/sanity'
import { productsQuery, newsQuery } from '@/lib/queries'

export const revalidate = 0 // Ensure fresh data on home page

export default async function Home() {
  // Fetch both products and news simultaneously
  const [products, newsItems] = await Promise.all([
    client.fetch(productsQuery),
    client.fetch(newsQuery)
  ]);

  return (
    <div className="bg-transparent">
      <HeroCarousel />
      <HomeContent products={products} newsItems={newsItems} />
    </div>
  )
}


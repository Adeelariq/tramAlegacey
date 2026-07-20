import { createClient } from '@/lib/supabase/server'
import ShopContent from '@/components/ShopContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop – Pure Copper Utensils & Materials',
  description: 'Browse our collection of handcrafted copper bottles, kitchenware, and raw copper materials from Kashmir.',
  openGraph: {
    title: 'Shop – Pure Copper Utensils & Materials | Tram A Legacy',
    description: 'Browse our collection of handcrafted copper bottles, kitchenware, and raw copper materials from Kashmir.',
    url: 'https://tramalegacy.com/shop',
  }
}

export const revalidate = 60

interface SearchParams {
  category?: string
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = createClient()

  // Fetch ALL products and categories once – filtering happens client-side
  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from('categories').select('*').order('created_at'),
    supabase.from('products').select('*, categories(name)').order('created_at'),
  ])

  // Structured data for SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tramalegacy.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: "https://tramalegacy.com/shop"
      },
    ]
  }

  const productSchemas = products?.map((product: any) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || "Premium handcrafted copper product from Kashmir.",
    image: product.image || "https://tramalegacy.com/icon.svg",
    brand: {
      "@type": "Brand",
      name: "Tram A Legacy"
    },
    offers: {
      "@type": "Offer",
      url: `https://tramalegacy.com/shop?category=${product.category_id || ''}`,
      priceCurrency: "INR",
      price: product.price || 0,
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    }
  }))

  return (
    <div className="bg-brand-black min-h-screen pt-28 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {productSchemas?.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="max-w-7xl mx-auto px-6">
        <ShopContent
          categories={(categories as any[]) ?? []}
          products={(products as any[]) ?? []}
          initialCategory={searchParams.category ?? null}
        />
      </div>
    </div>
  )
}

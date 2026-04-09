import { createClient } from '@/lib/supabase/server'
import AnimatedProductGrid from '@/components/animations/AnimatedProductGrid'
import FadeInSection from '@/components/animations/FadeInSection'
import Link from 'next/link'
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
  const { category } = searchParams

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from('categories').select('*').order('created_at'),
    category
      ? supabase.from('products').select('*, categories(name)').eq('category_id', category).order('created_at')
      : supabase.from('products').select('*, categories(name)').order('created_at'),
  ])

  const activeCategory = (categories as any[])?.find((c) => c.id === category)

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
      ...(activeCategory ? [{
        "@type": "ListItem",
        position: 3,
        name: activeCategory.name,
        item: `https://tramalegacy.com/shop?category=${activeCategory.id}`
      }] : [])
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
        {/* Header */}
        <FadeInSection className="text-center mb-16">
          <p className="font-sans text-[11px] tracking-[0.5em] text-copper-400/60 uppercase mb-4">
            {activeCategory ? activeCategory.name : 'All Products'}
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-brand-beige mb-4">
            {activeCategory ? activeCategory.name : 'Our Shop'}
          </h1>
          <div className="section-divider mb-4" />
          <p className="font-body text-brand-beige/50 text-lg">
            Handcrafted copper pieces rooted in Kashmiri artisan tradition
          </p>
        </FadeInSection>

        {/* Category Filters */}
        {categories && categories.length > 0 && (
          <FadeInSection delay={0.1} className="flex flex-wrap gap-3 justify-center mb-14">
            <Link
              href="/shop"
              className={`font-sans text-xs tracking-widest uppercase px-6 py-2.5 border transition-all duration-300 ${!category
                ? 'bg-copper-500 border-copper-500 text-brand-black'
                : 'border-copper-500/30 text-brand-beige/60 hover:border-copper-500 hover:text-copper-400'
                }`}
            >
              All
            </Link>
            {(categories as any[]).map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className={`font-sans text-xs tracking-widest uppercase px-6 py-2.5 border transition-all duration-300 ${category === cat.id
                  ? 'bg-copper-500 border-copper-500 text-brand-black'
                  : 'border-copper-500/30 text-brand-beige/60 hover:border-copper-500 hover:text-copper-400'
                  }`}
              >
                {cat.name}
              </Link>
            ))}
          </FadeInSection>
        )}

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <AnimatedProductGrid products={products as any} />
        ) : (
          <FadeInSection className="text-center py-24">
            <p className="font-display text-2xl text-brand-beige/30 mb-4">No products found</p>
            <p className="font-body text-brand-beige/20">Check back soon for new arrivals</p>
          </FadeInSection>
        )}
      </div>
    </div>
  )
}

'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useMemo, useCallback, useTransition } from 'react'
import AnimatedProductGrid from '@/components/animations/AnimatedProductGrid'
import FadeInSection from '@/components/animations/FadeInSection'
import type { Product, Category } from '@/types/database'

interface ShopContentProps {
  categories: Category[]
  products: Product[]
}

export default function ShopContent({ categories, products }: ShopContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const activeId = searchParams.get('category')

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeId) ?? null,
    [categories, activeId]
  )

  const filteredProducts = useMemo(
    () =>
      activeId
        ? products.filter((p) => p.category_id === activeId)
        : products,
    [products, activeId]
  )

  const handleCategoryChange = useCallback(
    (categoryId: string | null) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (categoryId) {
          params.set('category', categoryId)
        } else {
          params.delete('category')
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [searchParams, router, pathname]
  )

  return (
    <>
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
      {categories.length > 0 && (
        <FadeInSection delay={0.1} className="flex flex-wrap gap-3 justify-center mb-14">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`font-sans text-xs tracking-widest uppercase px-6 py-2.5 border transition-all duration-300 cursor-pointer ${
              !activeId
                ? 'bg-copper-500 border-copper-500 text-brand-black'
                : 'border-copper-500/30 text-brand-beige/60 hover:border-copper-500 hover:text-copper-400'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`font-sans text-xs tracking-widest uppercase px-6 py-2.5 border transition-all duration-300 cursor-pointer ${
                activeId === cat.id
                  ? 'bg-copper-500 border-copper-500 text-brand-black'
                  : 'border-copper-500/30 text-brand-beige/60 hover:border-copper-500 hover:text-copper-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </FadeInSection>
      )}

      {/* Products Grid – key forces remount so animations replay on category switch */}
      <div className={`transition-opacity duration-200 ${isPending ? 'opacity-60' : 'opacity-100'}`}>
        {filteredProducts.length > 0 ? (
          <AnimatedProductGrid key={activeId ?? '__all__'} products={filteredProducts} />
        ) : (
          <FadeInSection className="text-center py-24">
            <p className="font-display text-2xl text-brand-beige/30 mb-4">No products found</p>
            <p className="font-body text-brand-beige/20">Check back soon for new arrivals</p>
          </FadeInSection>
        )}
      </div>
    </>
  )
}

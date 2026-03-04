import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedStats from '@/components/animations/AnimatedStats'
import FadeInSection from '@/components/animations/FadeInSection'
import type { StatItem } from '@/components/animations/AnimatedStats'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard' }

export default async function AdminDashboardPage() {
  const supabase = createClient()

  const [
    { count: productCount },
    { count: categoryCount },
    { count: featuredCount },
    { data: recentProducts },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('featured', true),
    supabase.from('products').select('name, created_at, price, price_on_request').order('created_at', { ascending: false }).limit(5),
  ])

  const stats: StatItem[] = [
    { label: 'Total Products', value: productCount ?? 0, iconName: 'Package', href: '/admin-dashboard/products' },
    { label: 'Categories', value: categoryCount ?? 0, iconName: 'FolderOpen', href: '/admin-dashboard/categories' },
    { label: 'Featured Products', value: featuredCount ?? 0, iconName: 'Star', href: '/admin-dashboard/products' },
  ]

  return (
    <div className="pt-14 md:pt-0 px-6 py-8 max-w-5xl">
      <FadeInSection className="mb-10">
        <h1 className="font-display text-3xl font-bold text-brand-beige mb-1">Dashboard</h1>
        <p className="font-body text-brand-beige/40 text-sm">Welcome back to Tram A Legacy Admin</p>
      </FadeInSection>

      {/* Animated Stats */}
      <AnimatedStats stats={stats} />

      {/* Recent Products */}
      <FadeInSection delay={0.2}>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-brand-beige">Recent Products</h2>
            <Link
              href="/admin-dashboard/products"
              className="font-sans text-xs tracking-widest uppercase text-copper-400 hover:text-copper-300 flex items-center gap-2 transition-colors"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="glass-card copper-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-copper-500/10">
                  <th className="text-left font-sans text-xs tracking-widest uppercase text-copper-400/50 px-5 py-3">Name</th>
                  <th className="text-right font-sans text-xs tracking-widest uppercase text-copper-400/50 px-5 py-3">Price</th>
                  <th className="text-right font-sans text-xs tracking-widest uppercase text-copper-400/50 px-5 py-3 hidden sm:table-cell">Added</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts?.map((p: any, i) => (
                  <tr key={i} className="border-b border-copper-500/5 transition-all duration-200 hover:bg-copper-500/[0.04]">
                    <td className="px-5 py-3 font-body text-brand-beige/70 text-sm">{p.name}</td>
                    <td className="px-5 py-3 text-right font-body text-copper-400 text-sm">
                      {p.price_on_request ? 'On Request' : p.price ? `₹${p.price.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td className="px-5 py-3 text-right font-sans text-xs text-brand-beige/30 hidden sm:table-cell">
                      {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeInSection>
    </div>
  )
}

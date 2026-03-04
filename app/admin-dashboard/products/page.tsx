import { createClient } from '@/lib/supabase/server'
import ProductsManager from '@/components/admin/ProductsManager'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Manage Products' }
export const revalidate = 0

export default async function AdminProductsPage() {
  const supabase = createClient()
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name'),
  ])

  return <ProductsManager initialProducts={products ?? []} categories={categories ?? []} />
}

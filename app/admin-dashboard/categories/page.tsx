import { createClient } from '@/lib/supabase/server'
import CategoriesManager from '@/components/admin/CategoriesManager'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Manage Categories' }
export const revalidate = 0

export default async function AdminCategoriesPage() {
  const supabase = createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('created_at', { ascending: false })

  return <CategoriesManager initialCategories={categories ?? []} />
}

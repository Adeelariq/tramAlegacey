import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()

  const [categoriesRes] = await Promise.all([
    supabase.from('categories').select('id'),
  ])

  const categories = categoriesRes.data || []

  const categoryRoutes = categories.map((c: any) => ({
    url: `https://tramalegacy.com/shop?category=${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://tramalegacy.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://tramalegacy.com/shop', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://tramalegacy.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://tramalegacy.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...categoryRoutes,
  ]
}

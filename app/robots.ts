import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-dashboard/', '/admin-login'],
    },
    sitemap: 'https://tramalegacy.com/sitemap.xml',
  }
}

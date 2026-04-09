import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tramalegacy.com'),
  title: {
    default: 'Tram A Legacy – Premium Copper Utensils | Srinagar',
    template: '%s | Tram A Legacy',
  },
  description:
    'Discover handcrafted pure copper utensils and raw copper materials from the heart of Kashmir. Timeless craftsmanship rooted in Srinagar\'s artisan heritage.',
  keywords: ['copper utensils', 'copper kitchenware', 'Kashmir copper', 'Srinagar', 'handcrafted copper', 'pure copper bottles', 'raw copper sheets', 'Tram A Legacy'],
  authors: [{ name: 'Tram A Legacy' }],
  creator: 'Tram A Legacy',
  publisher: 'Tram A Legacy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://tramalegacy.com',
    siteName: 'Tram A Legacy',
    title: 'Tram A Legacy – Premium Copper Utensils | Srinagar',
    description: 'Timeless craftsmanship in pure copper. Handcrafted utensils and raw copper materials from Kashmir.',
    images: [
      {
        url: '/icon.svg',
        width: 1200,
        height: 630,
        alt: 'Tram A Legacy Copper Utensils',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tram A Legacy – Premium Copper Utensils',
    description: 'Timeless craftsmanship in pure copper from Kashmir.',
    images: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  category: 'ecommerce',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tram A Legacy",
    url: "https://tramalegacy.com",
    logo: "https://tramalegacy.com/icon.svg",
    description: "Discover handcrafted pure copper utensils and raw copper materials from the heart of Kashmir. Timeless craftsmanship rooted in Srinagar's artisan heritage.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-7889652311",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: "en"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nallah Mar Road, Saraf Kadal",
      addressLocality: "Srinagar",
      addressRegion: "Jammu & Kashmir",
      postalCode: "190001",
      addressCountry: "IN"
    },
    sameAs: [
      "https://www.instagram.com/tram_sund"
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

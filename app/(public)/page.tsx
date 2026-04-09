import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Phone, Mail, Instagram, Star, Leaf, Shield } from 'lucide-react'
import img3 from './img3.webp'
import HeroSection from '@/components/animations/HeroSection'
import AnimatedProductGrid from '@/components/animations/AnimatedProductGrid'
import AnimatedCategoryGrid from '@/components/animations/AnimatedCategoryGrid'
import FadeInSection from '@/components/animations/FadeInSection'
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tram A Legacy – Timeless Copper Craftsmanship from Kashmir',
  description: 'Discover handcrafted pure copper utensils and raw copper materials from the heart of Kashmir.',
  openGraph: {
    title: 'Tram A Legacy – Timeless Copper Craftsmanship from Kashmir',
    description: 'Discover handcrafted pure copper utensils and raw copper materials from the heart of Kashmir.',
    url: 'https://tramalegacy.com',
  }
}

export const revalidate = 60

export default async function HomePage() {
  const supabase = createClient()

  const [{ data: categories }, { data: featuredProducts }] = await Promise.all([
    supabase.from('categories').select('*').order('created_at'),
    supabase.from('products').select('*, categories(name)').eq('featured', true).limit(6),
  ])

  return (
    <div className="bg-brand-black">
      {/* ===== HERO ===== */}
      <HeroSection />

      {/* ===== MARQUEE ===== */}
      <div className="border-y border-copper-500/20 bg-brand-brown/30 py-4 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex items-center gap-12 font-sans text-xs tracking-[0.4em] text-copper-500/50 uppercase">
              <span>Pure Copper Craftsmanship</span>
              <span className="w-1 h-1 bg-copper-500 rounded-full inline-block" />
              <span>Handcrafted in Srinagar</span>
              <span className="w-1 h-1 bg-copper-500 rounded-full inline-block" />
              <span>Kashmir Artisan Legacy</span>
              <span className="w-1 h-1 bg-copper-500 rounded-full inline-block" />
              <span>Premium Quality</span>
              <span className="w-1 h-1 bg-copper-500 rounded-full inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInSection className="text-center mb-16">
            <p className="font-sans text-[11px] tracking-[0.5em] text-copper-400/60 uppercase mb-4">Browse By</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-beige mb-4">
              Our Collections
            </h2>
            <div className="section-divider" />
          </FadeInSection>

          {categories && categories.length > 0 ? (
            <AnimatedCategoryGrid categories={categories} />
          ) : (
            <div className="text-center text-brand-beige/40 font-body py-12">Categories loading...</div>
          )}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-24 px-6 bg-brand-brown/20">
          <div className="max-w-7xl mx-auto">
            <FadeInSection className="text-center mb-16">
              <p className="font-sans text-[11px] tracking-[0.5em] text-copper-400/60 uppercase mb-4">Handpicked For You</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-beige mb-4">
                Featured Products
              </h2>
              <div className="section-divider" />
            </FadeInSection>

            <AnimatedProductGrid
              products={featuredProducts as any}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            />

            <FadeInSection className="text-center" delay={0.1}>
              <Link href="/shop" className="btn-ghost-copper inline-flex items-center gap-3">
                View All Products <ArrowRight size={16} />
              </Link>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* ===== WHY COPPER ===== */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection className="text-center mb-16">
            <p className="font-sans text-[11px] tracking-[0.5em] text-copper-400/60 uppercase mb-4">The Ancient Wisdom</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-beige mb-4">
              Why Copper?
            </h2>
            <div className="section-divider" />
          </FadeInSection>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf size={28} className="text-copper-400" />,
                title: 'Naturally Antimicrobial',
                desc: "Copper's natural properties inhibit bacterial growth, making it the purest choice for drinking water storage.",
              },
              {
                icon: <Star size={28} className="text-copper-400" />,
                title: 'Ayurvedic Heritage',
                desc: 'Rooted in millennia-old Ayurvedic tradition, copper vessels enhance water quality and promote wellness.',
              },
              {
                icon: <Shield size={28} className="text-copper-400" />,
                title: 'Lifetime Durability',
                desc: 'Solid copper construction that improves with age, developing a rich patina that tells its own story.',
              },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="glass-card copper-border p-8 text-center hover:border-copper-500/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(184,115,51,0.15)] hover:-translate-y-1">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-copper-500/30 bg-copper-500/5">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-brand-beige mb-3">{item.title}</h3>
                  <p className="font-body text-brand-beige/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-24 px-6 bg-brand-brown/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInSection direction="left">
            <p className="font-sans text-[11px] tracking-[0.5em] text-copper-400/60 uppercase mb-4">Our Heritage</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-beige mb-6 leading-tight">
              A Legacy Forged<br />
              <span className="copper-text">in Kashmir&apos;s Fires</span>
            </h2>
            <div className="w-16 h-px bg-copper-500/60 mb-8" />
            <p className="font-body text-brand-beige/60 text-lg leading-relaxed mb-6">
              Nestled on Nallah Mar Road in the historic heart of Srinagar, Tram A Legacy carries forward a tradition of copper craftsmanship that has defined our valley for centuries.
            </p>
            <p className="font-body text-brand-beige/50 leading-relaxed mb-10">
              Every piece in our collection is shaped by the hands of master artisans — connecting the ancient with the contemporary, the functional with the beautiful.
            </p>
            <Link href="/about" className="btn-ghost-copper inline-flex items-center gap-3">
              Our Story <ArrowRight size={16} />
            </Link>
          </FadeInSection>

          <FadeInSection direction="right" delay={0.15}>
            <div className="relative">
              <div className="aspect-[4/5] bg-brand-brown border border-copper-500/20 overflow-hidden relative">
                <Image
                  src={img3}
                  alt="Copper craftsmanship"
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent" />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-copper-500/20 -z-10" />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===== INSTAGRAM ===== */}
      <FadeInSection>
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="font-sans text-[11px] tracking-[0.5em] text-copper-400/60 uppercase mb-4">Follow Our Journey</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-beige mb-4">
              On Instagram
            </h2>
            <div className="section-divider mb-8" />
            <p className="font-body text-brand-beige/50 mb-10 text-lg">
              Join our community of copper lovers and get a behind-the-scenes look at the artistry that goes into every piece.
            </p>
            <a
              href="https://www.instagram.com/tram_sund"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-copper inline-flex items-center gap-3"
            >
              <Instagram size={18} />
              @tram_sund
            </a>
          </div>
        </section>
      </FadeInSection>

      {/* ===== LOCATION PREVIEW ===== */}
      <FadeInSection>
        <section className="py-16 px-6 bg-brand-brown/20 border-t border-copper-500/10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <MapPin className="text-copper-500 flex-shrink-0" size={24} />
              <div>
                <p className="font-display text-lg text-brand-beige">Nallah Mar Road, Saraf Kadal</p>
                <p className="font-body text-brand-beige/50 text-sm">Srinagar, Jammu &amp; Kashmir, India</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-copper-500 flex-shrink-0" size={20} />
              <a href="tel:+917889652311" className="font-body text-brand-beige/70 hover:text-copper-400 transition-colors">
                +91 788 965 2311
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-copper-500 flex-shrink-0" size={20} />
              <a href="mailto:Zurairdurani167@gmail.com" className="font-body text-brand-beige/70 hover:text-copper-400 transition-colors text-sm">
                Zurairdurani167@gmail.com
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>
    </div>
  )
}

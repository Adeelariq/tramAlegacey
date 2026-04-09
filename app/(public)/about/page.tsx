import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import img1 from '../img1.webp'
import img2 from '../img2.webp'
import FadeInSection from '@/components/animations/FadeInSection'
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us – Our Kashmiri Copper Heritage',
  description: 'Discover the story behind Tram A Legacy — a Srinagar-based copper utensils store rooted in centuries of artisan tradition.',
  openGraph: {
    title: 'About Us – Our Kashmiri Copper Heritage | Tram A Legacy',
    description: 'Discover the story behind Tram A Legacy — a Srinagar-based copper utensils store rooted in centuries of artisan tradition.',
    url: 'https://tramalegacy.com/about',
  }
}

export default function AboutPage() {
  return (
    <div className="bg-brand-black min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <FadeInSection className="text-center mb-20">
          <p className="font-sans text-[11px] tracking-[0.5em] text-copper-400/60 uppercase mb-4">Our Heritage</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-brand-beige mb-4">
            The Story Behind<br />
            <span className="copper-text">Tram A Legacy</span>
          </h1>
          <div className="section-divider" />
        </FadeInSection>

        {/* Story Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <FadeInSection direction="left">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-beige mb-6">
              Rooted in the Heart of Srinagar
            </h2>
            <div className="w-12 h-px bg-copper-500/60 mb-8" />
            <p className="font-body text-brand-beige/60 text-lg leading-relaxed mb-6">
              On the ancient banks of Nallah Mar, in the storied neighbourhood of Saraf Kadal, Tram A Legacy was born from a simple but profound belief: that the objects we use every day should carry beauty, purpose, and history.
            </p>
            <p className="font-body text-brand-beige/50 leading-relaxed mb-6">
              Kashmir&apos;s relationship with copper is as old as civilization itself. The kashmir valley&apos;s skilled coppersmith communities — known locally as &quot;Thakurs&quot; — have passed their craft down through generations, each workshop a living museum of technique and tradition.
            </p>
            <p className="font-body text-brand-beige/50 leading-relaxed">
              At Tram A Legacy, we serve as both custodians and connectors — preserving this irreplaceable craft while making it accessible to those who seek quality, authenticity, and meaning in what they own.
            </p>
          </FadeInSection>

          <FadeInSection direction="right" delay={0.15}>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src={img1}
                  alt="Copper craftsmanship in Kashmir"
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-copper-500/10 border border-copper-500/20 -z-10" />
            </div>
          </FadeInSection>
        </div>

        {/* Values */}
        <div className="mb-24">
          <FadeInSection className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-beige mb-4">Our Values</h2>
            <div className="section-divider" />
          </FadeInSection>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Authenticity',
                desc: 'Every product we offer is genuinely handcrafted by skilled Kashmiri artisans using traditional techniques passed down through generations.',
              },
              {
                num: '02',
                title: 'Purity',
                desc: 'We source only high-grade copper, ensuring every vessel meets our strict standards for quality, purity, and craftsmanship.',
              },
              {
                num: '03',
                title: 'Legacy',
                desc: "We are committed to preserving Kashmir's copper crafting heritage by supporting local artisans and their communities.",
              },
            ].map((v) => (
              <StaggerItem key={v.num}>
                <div className="glass-card copper-border p-8 hover:border-copper-500/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(184,115,51,0.15)] hover:-translate-y-1">
                  <span className="font-display text-5xl font-bold copper-text opacity-40 mb-4 block">{v.num}</span>
                  <h3 className="font-display text-xl font-semibold text-brand-beige mb-3">{v.title}</h3>
                  <p className="font-body text-brand-beige/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        {/* Story Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <FadeInSection direction="right" className="lg:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-beige mb-6">
              Raw Copper to<br />
              <span className="copper-text">Living Heritage</span>
            </h2>
            <div className="w-12 h-px bg-copper-500/60 mb-8" />
            <p className="font-body text-brand-beige/60 text-lg leading-relaxed mb-6">
              Beyond finished utensils, we also supply raw copper materials — sheets, rods, and billets — to craftspeople, artists, and industries across the region. This dual role connects us deeply to the entire copper ecosystem of Kashmir.
            </p>
            <p className="font-body text-brand-beige/50 leading-relaxed mb-10">
              Whether you are a homeowner seeking the health benefits of copper-stored water, a collector drawn to the beauty of Kashmiri metalwork, or a craftsperson looking for quality raw materials, Tram A Legacy is your partner.
            </p>
            <Link href="/shop" className="btn-copper inline-flex items-center gap-3">
              Browse Our Collection <ArrowRight size={16} />
            </Link>
          </FadeInSection>

          <FadeInSection direction="left" delay={0.15} className="lg:order-1">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src={img2}
                  alt="Raw copper materials"
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
              </div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-copper-500/5 border border-copper-500/10 -z-10" />
            </div>
          </FadeInSection>
        </div>

        {/* CTA */}
        <FadeInSection className="text-center py-16 border-t border-copper-500/10">
          <h2 className="font-display text-3xl font-bold text-brand-beige mb-4">
            Experience the Legacy
          </h2>
          <p className="font-body text-brand-beige/50 mb-8 text-lg max-w-xl mx-auto">
            Visit us at Nallah Mar Road, Srinagar, or reach out via WhatsApp to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-copper inline-flex items-center gap-3">
              Get in Touch
            </Link>
            <Link href="/shop" className="btn-ghost-copper inline-flex items-center gap-3">
              Shop Now
            </Link>
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}

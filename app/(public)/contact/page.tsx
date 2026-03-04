import { MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react'
import FadeInSection from '@/components/animations/FadeInSection'
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Tram A Legacy. Visit us in Srinagar or reach out via WhatsApp, email, or phone.',
  openGraph: {
    title: 'Contact Us | Tram A Legacy',
    description: 'Get in touch with Tram A Legacy. Visit us in Srinagar or reach out via WhatsApp, email, or phone.',
    url: 'https://tramalegacy.com/contact',
  }
}

export default function ContactPage() {
  return (
    <div className="bg-brand-black min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeInSection className="text-center mb-16">
          <p className="font-sans text-[11px] tracking-[0.5em] text-copper-400/60 uppercase mb-4">We&apos;d Love to Hear From You</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-brand-beige mb-4">
            Get in Touch
          </h1>
          <div className="section-divider" />
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeInSection direction="left">
            <h2 className="font-display text-2xl font-semibold text-brand-beige mb-8">Contact Information</h2>

            <StaggerChildren className="space-y-6">
              {/* Address */}
              <StaggerItem>
                <div className="glass-card copper-border p-6 flex gap-4 hover:border-copper-500/40 transition-all duration-300">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-copper-500/30 bg-copper-500/5">
                    <MapPin size={20} className="text-copper-400" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-widest uppercase text-copper-400/60 mb-2">Our Store</h3>
                    <p className="font-body text-brand-beige/80 leading-relaxed">
                      Nallah Mar Road, Saraf Kadal<br />
                      Srinagar, Jammu &amp; Kashmir<br />
                      India – 190001
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Phone */}
              <StaggerItem>
                <div className="glass-card copper-border p-6 flex gap-4 hover:border-copper-500/40 transition-all duration-300">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-copper-500/30 bg-copper-500/5">
                    <Phone size={20} className="text-copper-400" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-widest uppercase text-copper-400/60 mb-2">Phone &amp; WhatsApp</h3>
                    <a
                      href="tel:+917889652311"
                      className="font-body text-brand-beige/80 hover:text-copper-400 transition-colors text-lg"
                    >
                      +91 788 965 2311
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Email */}
              <StaggerItem>
                <div className="glass-card copper-border p-6 flex gap-4 hover:border-copper-500/40 transition-all duration-300">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-copper-500/30 bg-copper-500/5">
                    <Mail size={20} className="text-copper-400" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-widest uppercase text-copper-400/60 mb-2">Email</h3>
                    <a
                      href="mailto:Zurairdurani167@gmail.com"
                      className="font-body text-brand-beige/80 hover:text-copper-400 transition-colors"
                    >
                      Zurairdurani167@gmail.com
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Instagram */}
              <StaggerItem>
                <div className="glass-card copper-border p-6 flex gap-4 hover:border-copper-500/40 transition-all duration-300">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-copper-500/30 bg-copper-500/5">
                    <Instagram size={20} className="text-copper-400" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-widest uppercase text-copper-400/60 mb-2">Instagram</h3>
                    <a
                      href="https://www.instagram.com/tram_sund"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-brand-beige/80 hover:text-copper-400 transition-colors"
                    >
                      @tram_sund
                    </a>
                  </div>
                </div>
              </StaggerItem>
            </StaggerChildren>

            {/* WhatsApp CTA */}
            <FadeInSection delay={0.3}>
              <a
                href="https://wa.me/917889652311?text=Hello%20Tram%20A%20Legacy%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-3 bg-[#25D366] text-white font-sans text-sm tracking-wider uppercase py-4 px-8 hover:bg-[#1da851] transition-colors duration-300 w-full"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </FadeInSection>
          </FadeInSection>

          {/* Map */}
          <FadeInSection direction="right" delay={0.15}>
            <h2 className="font-display text-2xl font-semibold text-brand-beige mb-8">Find Us</h2>
            <div className="aspect-[4/3] overflow-hidden copper-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.000!2d74.8018!3d34.0837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f7a90e5b7c1%3A0x!2sNallah+Mar+Road%2C+Saraf+Kadal%2C+Srinagar%2C+J%26K!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tram A Legacy Location"
              />
            </div>
            <p className="font-body text-brand-beige/40 text-sm mt-4 text-center">
              Nallah Mar Road, Saraf Kadal, Srinagar
            </p>

            {/* Business hours */}
            <div className="mt-8 glass-card copper-border p-6">
              <h3 className="font-sans text-xs tracking-widest uppercase text-copper-400/60 mb-4">Business Hours</h3>
              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between text-brand-beige/60">
                  <span>Monday – Saturday</span>
                  <span className="text-copper-400">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between text-brand-beige/60">
                  <span>Sunday</span>
                  <span className="text-brand-beige/30">Closed</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  )
}

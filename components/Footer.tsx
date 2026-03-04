import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Lock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-brown border-t border-copper-500/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold copper-text mb-3">Tram A Legacy</h3>
            <p className="font-sans text-[10px] tracking-[0.3em] text-copper-500/60 uppercase mb-4">
              Pure Copper • Srinagar
            </p>
            <p className="font-body text-brand-beige/60 text-sm leading-relaxed">
              Timeless craftsmanship rooted in Kashmir's artisan heritage. Every piece carries the legacy of generations.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/tram_sund"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-copper-500/30 flex items-center justify-center text-copper-500 hover:bg-copper-500 hover:text-brand-black transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-copper-400 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/shop', label: 'Shop' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-brand-beige/60 hover:text-copper-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Admin Login */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-copper-400 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-copper-500 mt-0.5 flex-shrink-0" />
                <span className="font-body text-brand-beige/60 text-sm leading-relaxed">
                  Nallah Mar Road, Saraf Kadal,<br />Srinagar, J&K, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-copper-500 flex-shrink-0" />
                <a href="tel:+917889652311" className="font-body text-brand-beige/60 hover:text-copper-400 transition-colors text-sm">
                  +91 788 965 2311
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-copper-500 flex-shrink-0" />
                <a href="mailto:Zurairdurani167@gmail.com" className="font-body text-brand-beige/60 hover:text-copper-400 transition-colors text-sm">
                  Zurairdurani167@gmail.com
                </a>
              </li>
            </ul>

            {/* Admin Login — subtle, below contact */}
            <div className="mt-8 pt-6 border-t border-copper-500/10">
              <Link
                href="/admin-login"
                className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] uppercase text-brand-beige/20 hover:text-copper-500/70 transition-all duration-300 group"
              >
                <Lock size={11} className="group-hover:text-copper-500/70 transition-colors" />
                Admin Login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-copper-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <p className="font-sans text-xs text-brand-beige/30">
              © {new Date().getFullYear()} Tram A Legacy. All rights reserved.
            </p>
            <p className="font-sans text-[10px] tracking-widest uppercase text-copper-500/40">
              made with ❤️ by adeel
            </p>
          </div>
          <p className="font-sans text-xs text-brand-beige/30">
            Crafted with legacy in Srinagar, Kashmir
          </p>
        </div>
      </div>
    </footer>
  )
}

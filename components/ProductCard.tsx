'use client'

import Image from 'next/image'
import { MessageCircle, Mail, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '@/types/database'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello Tram A Legacy,\n\nI am interested in:\nProduct Name: ${product.name}\nPrice: ${product.price_on_request ? 'Price on Request' : `₹${product.price}`}\n\nPlease share more details.`
  )

  const emailSubject = encodeURIComponent(`Inquiry about ${product.name}`)
  const emailBody = encodeURIComponent(
    `Hello Tram A Legacy,\n\nI am interested in:\nProduct Name: ${product.name}\nPrice: ${product.price_on_request ? 'Price on Request' : `₹${product.price}`}\n\nPlease share more details.\n\nThank you.`
  )

  return (
    <motion.div
      className="group glass-card overflow-hidden copper-border hover:border-copper-500/60 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(184,115,51,0.25)] cursor-default"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-brand-brown">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-copper-500/30">
            <Tag size={48} />
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-copper-500 text-brand-black font-sans text-[10px] tracking-widest uppercase px-3 py-1 font-semibold">
            Featured
          </span>
        )}
        {product.price_on_request && (
          <span className="absolute top-3 right-3 bg-brand-black/80 backdrop-blur-sm border border-copper-500/40 text-copper-400 font-sans text-[10px] tracking-widest uppercase px-3 py-1">
            On Request
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-brand-beige group-hover:text-copper-300 transition-colors leading-snug mb-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="font-body text-brand-beige/50 text-sm leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="mb-5">
          {product.price_on_request ? (
            <span className="font-display text-lg italic text-copper-400">Price on Request</span>
          ) : product.price ? (
            <span className="font-display text-2xl font-semibold copper-text">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          ) : null}
        </div>

        {/* Inquiry Buttons */}
        <div className="flex gap-2">
          {product.enable_whatsapp_inquiry && (
            <motion.a
              href={`https://wa.me/917889652311?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 py-2.5 font-sans text-xs tracking-wider uppercase"
              aria-label="Inquire via WhatsApp"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={14} />
              <span className="hidden sm:inline">WhatsApp</span>
            </motion.a>
          )}
          {product.enable_email_inquiry && (
            <motion.a
              href={`mailto:Zurairdurani167@gmail.com?subject=${emailSubject}&body=${emailBody}`}
              className="flex-1 flex items-center justify-center gap-2 bg-copper-500/10 border border-copper-500/30 text-copper-400 hover:bg-copper-500 hover:text-brand-black transition-all duration-300 py-2.5 font-sans text-xs tracking-wider uppercase"
              aria-label="Inquire via Email"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={14} />
              <span className="hidden sm:inline">Email</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { memo } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/types/database'

interface Props {
  categories: Category[]
}

const normalizeImageSrc = (value: string | null) => {
  const raw = value?.trim()
  if (!raw) return null
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:')) return raw
  return raw.startsWith('/') ? raw : `/${raw}`
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function AnimatedCategoryGridComponent({ categories }: Props) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {categories.map((cat) => {
        const imageSrc = normalizeImageSrc(cat.image)
        return (
          <motion.div key={cat.id} variants={itemVariants}>
            <Link
              href={`/shop?category=${cat.id}`}
              className="group relative aspect-[4/3] overflow-hidden copper-border hover:border-copper-500/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(184,115,51,0.25)] block"
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={cat.name}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-brand-brown" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-semibold text-brand-beige group-hover:text-copper-300 transition-colors mb-2">
                  {cat.name}
                </h3>
                <span className="font-sans text-[10px] tracking-[0.3em] text-copper-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                  Browse Collection <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

const AnimatedCategoryGrid = memo(AnimatedCategoryGridComponent)
export default AnimatedCategoryGrid

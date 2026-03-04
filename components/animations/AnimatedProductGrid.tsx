'use client'

import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types/database'

interface Props {
  products: Product[]
  className?: string
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function AnimatedProductGrid({ products, className }: Props) {
  return (
    <motion.div
      className={className ?? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}

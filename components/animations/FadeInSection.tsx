'use client'

import { motion } from 'framer-motion'

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export default function FadeInSection({
  children,
  delay = 0,
  className,
  direction = 'up',
}: FadeInSectionProps) {
  const getInitial = () => {
    switch (direction) {
      case 'up':    return { opacity: 0, y: 40 }
      case 'down':  return { opacity: 0, y: -40 }
      case 'left':  return { opacity: 0, x: -40 }
      case 'right': return { opacity: 0, x: 40 }
      default:      return { opacity: 0 }
    }
  }

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

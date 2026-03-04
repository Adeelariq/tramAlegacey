'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, FolderOpen, Star, ArrowRight } from 'lucide-react'

const iconMap = {
  Package,
  FolderOpen,
  Star,
}

export type IconName = keyof typeof iconMap

export interface StatItem {
  label: string
  value: number
  iconName: IconName
  href: string
}

interface Props {
  stats: StatItem[]
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function AnimatedStats({ stats }: Props) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {stats.map(({ label, value, iconName, href }) => {
        const Icon = iconMap[iconName]
        return (
          <motion.div key={label} variants={itemVariants}>
            <Link
              href={href}
              className="glass-card copper-border p-6 hover:border-copper-500/50 transition-all duration-300 group block hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(184,115,51,0.2)]"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon size={20} className="text-copper-500" />
                <ArrowRight
                  size={14}
                  className="text-copper-500/30 group-hover:text-copper-500 transition-all duration-300 group-hover:translate-x-1"
                />
              </div>
              <p className="font-display text-4xl font-bold copper-text mb-1">{value}</p>
              <p className="font-sans text-xs tracking-widest uppercase text-brand-beige/40">{label}</p>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

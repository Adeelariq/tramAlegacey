'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-brown to-brand-black" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 50%, rgba(184,115,51,0.35) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(212,148,74,0.15) 0%, transparent 50%)',
          }}
        />
        {/* Pulsing copper orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          animate={{
            opacity: [0.04, 0.12, 0.04],
            scale: [0.88, 1.08, 0.88],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle, rgba(184,115,51,0.55) 0%, transparent 70%)',
          }}
        />
        {/* Decorative spinning rings */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-copper-500/10 animate-[spin_40s_linear_infinite]" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full border border-copper-400/5 animate-[spin_30s_linear_infinite_reverse]" />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={lineVariants}
          className="font-sans text-[11px] tracking-[0.5em] text-copper-400 uppercase mb-6 opacity-80"
        >
          Est. in Srinagar, Kashmir
        </motion.p>

        <div className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-2">
          <motion.span variants={lineVariants} className="block text-brand-beige">
            Timeless
          </motion.span>
          <motion.span variants={lineVariants} className="block copper-text-animate">
            Craftsmanship
          </motion.span>
          <motion.span
            variants={lineVariants}
            className="block text-brand-beige/80 text-5xl md:text-7xl lg:text-8xl italic font-light mt-2"
          >
            in Pure Copper
          </motion.span>
        </div>

        {/* Animated copper underline accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.3, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-24 h-px mx-auto my-8 origin-left"
          style={{ background: 'linear-gradient(90deg, #B87333, #d4944a, #e8a862, #d4944a)' }}
        />

        <motion.p
          variants={lineVariants}
          className="font-body text-brand-beige/60 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Every vessel carries the soul of Kashmir's artisan heritage. Handcrafted copper utensils
          shaped by generations of mastery.
        </motion.p>

        <motion.div
          variants={lineVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/shop" className="btn-copper inline-flex items-center gap-3">
              Explore Collection <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <a
              href="https://wa.me/917889652311"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-copper inline-flex items-center gap-3"
            >
              WhatsApp Inquiry
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-copper-500/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-copper-500/50 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

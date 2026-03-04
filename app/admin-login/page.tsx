'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin-dashboard')
      router.refresh()
    }
  }

  const inputStyle = 'w-full bg-brand-black/50 border border-copper-500/20 text-brand-beige font-body px-4 py-3 focus:outline-none focus:border-copper-500 transition-all duration-300 input-copper'

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6 relative">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 text-copper-400 hover:text-copper-300 transition-colors font-sans text-xs tracking-widest uppercase z-50 bg-brand-black/50 p-2 rounded-full backdrop-blur-sm border border-copper-500/20"
      >
        <Home size={16} />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(184,115,51,0.12) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        className="relative w-full max-w-md z-10"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h1 className="font-display text-3xl font-bold copper-text mb-1">Tram A Legacy</h1>
          <p className="font-sans text-xs tracking-[0.4em] text-copper-500/50 uppercase">Admin Portal</p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="glass-card copper-border p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-display text-xl font-semibold text-brand-beige mb-6 text-center">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-copper-400/60 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyle}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-copper-400/60 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputStyle} pr-12`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-copper-500/40 hover:text-copper-400 transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-sans text-xs text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-2"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-copper flex items-center justify-center gap-3 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="animate-pulse">Signing in...</span>
              ) : (
                <>
                  <LogIn size={16} /> Sign In
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        <p className="text-center font-sans text-xs text-brand-beige/20 mt-6 mb-6">
          Admin access only. No public registration.
        </p>
      </motion.div>
    </div>
  )
}

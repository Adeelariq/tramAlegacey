'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, FolderOpen, LogOut, Menu, X, Home } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AdminSidebarProps {
  userEmail: string
}

const links = [
  { href: '/admin-dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin-dashboard/products', label: 'Products', icon: Package },
  { href: '/admin-dashboard/categories', label: 'Categories', icon: FolderOpen },
  { href: '/', label: 'Home', icon: Home },
]

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin-login')
    router.refresh()
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-brand-brown border-r border-copper-500/20">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-copper-500/10">
        <h1 className="font-display text-lg font-bold copper-text">Tram A Legacy</h1>
        <p className="font-sans text-[10px] tracking-widest text-copper-500/40 uppercase mt-0.5">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 font-sans text-sm tracking-wide transition-all duration-200 ${isActive(href, exact)
                ? 'bg-copper-500/15 text-copper-400 border-l-2 border-copper-500'
                : 'text-brand-beige/50 hover:text-brand-beige/80 hover:bg-copper-500/5'
              }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="px-4 py-4 border-t border-copper-500/10">
        <p className="font-sans text-xs text-brand-beige/30 px-4 mb-3 truncate">{userEmail}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full font-sans text-sm text-brand-beige/40 hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block fixed left-0 top-0 bottom-0 w-64 z-40">
        <SidebarContent />
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-brand-brown border-b border-copper-500/20 px-4 py-3 flex items-center justify-between">
        <h1 className="font-display text-base font-bold copper-text">Tram A Legacy Admin</h1>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-brand-beige/60">
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 pt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="relative w-64 h-full"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

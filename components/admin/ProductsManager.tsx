'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit2, Trash2, X, Save, Star, MessageCircle, Mail, Tag } from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import type { Product, Category } from '@/types/database'

interface Props {
  initialProducts: (Product & { categories?: { name: string } | null })[]
  categories: Category[]
}

const labelStyle = 'block font-sans text-xs tracking-widest uppercase text-copper-400/50 mb-2'
const inputStyle = 'w-full bg-brand-black/50 border border-copper-500/20 text-brand-beige font-body text-sm px-4 py-2.5 focus:outline-none focus:border-copper-500/50 transition-all duration-300 input-copper'
const thStyle = 'text-left font-sans text-xs tracking-widest uppercase text-copper-400/40 px-5 py-3'
const badgeCopper = 'font-sans text-[10px] tracking-wider uppercase px-2 py-0.5 bg-copper-500/15 text-copper-400 border border-copper-500/20'
const badgeGreen = 'font-sans text-[10px] tracking-wider uppercase px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20'
const badgeBlue = 'font-sans text-[10px] tracking-wider uppercase px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20'

const emptyForm = {
  name: '',
  price: '',
  description: '',
  image: '',
  category_id: '',
  featured: false,
  price_on_request: false,
  enable_whatsapp_inquiry: true,
  enable_email_inquiry: true,
}

type FormData = typeof emptyForm

export default function ProductsManager({ initialProducts, categories }: Props) {
  const [products, setProducts] = useState(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const supabase = createClient()

  const openAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setImageFile(null)
    setError('')
    setShowForm(true)
  }

  const openEdit = (p: Product) => {
    setForm({
      name: p.name,
      price: p.price?.toString() ?? '',
      description: p.description ?? '',
      image: p.image ?? '',
      category_id: p.category_id ?? '',
      featured: p.featured,
      price_on_request: p.price_on_request,
      enable_whatsapp_inquiry: p.enable_whatsapp_inquiry,
      enable_email_inquiry: p.enable_email_inquiry,
    })
    setEditingId(p.id)
    setImageFile(null)
    setError('')
    setShowForm(true)
  }

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop()
    const path = `products/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(path, file, { upsert: true })
    if (error) throw error
    const { data } = supabase.storage.from('images').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let imageUrl = form.image

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const payload = {
        name: form.name,
        price: form.price_on_request ? null : form.price ? parseFloat(form.price) : null,
        description: form.description || null,
        image: imageUrl || null,
        category_id: form.category_id || null,
        featured: form.featured,
        price_on_request: form.price_on_request,
        enable_whatsapp_inquiry: form.enable_whatsapp_inquiry,
        enable_email_inquiry: form.enable_email_inquiry,
      }

      if (editingId) {
        // @ts-ignore
        const { data, error } = await supabase.from('products').update(payload as any).eq('id', editingId as any).select('*, categories(name)').single()
        if (error) throw error
        setProducts((prev) => prev.map((p) => (p.id === editingId ? (data as Product & { categories?: { name: string } | null }) : p)))
      } else {
        // @ts-ignore
        const { data, error } = await supabase.from('products').insert(payload as any).select('*, categories(name)').single()
        if (error) throw error
        setProducts((prev) => [data as Product & { categories?: { name: string } | null }, ...prev])
      }

      setShowForm(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    setDeletingId(id)
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
    setDeletingId(null)
  }

  return (
    <div className="pt-14 md:pt-0 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-beige mb-1">Products</h1>
          <p className="font-body text-brand-beige/40 text-sm">{products.length} products total</p>
        </div>
        <motion.button
          onClick={openAdd}
          className="btn-copper flex items-center gap-2 text-xs px-5 py-2.5"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={15} /> Add Product
        </motion.button>
      </div>

      {/* Animated Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-sm overflow-y-auto py-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="glass-card copper-border w-full max-w-2xl p-8 relative"
              initial={{ opacity: 0, scale: 0.95, y: -24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-brand-beige/40 hover:text-brand-beige transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="font-display text-xl font-semibold text-brand-beige mb-6">
                {editingId ? 'Edit Product' : 'Add Product'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className={labelStyle}>Product Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputStyle}
                      placeholder="e.g. Classic Copper Bottle"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className={labelStyle}>Price (₹)</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className={inputStyle}
                      placeholder="e.g. 999"
                      disabled={form.price_on_request}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className={labelStyle}>Category</label>
                    <select
                      value={form.category_id}
                      onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                      className={inputStyle}
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className={labelStyle}>Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className={`${inputStyle} min-h-[80px] resize-y`}
                      placeholder="Product description..."
                    />
                  </div>

                  {/* Image URL or upload */}
                  <div className="sm:col-span-2">
                    <label className={labelStyle}>Image</label>
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className={`${inputStyle} mb-2`}
                      placeholder="https://... or upload below"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                      className="font-sans text-xs text-brand-beige/50 file:mr-3 file:btn-ghost-copper file:text-xs file:px-3 file:py-1.5"
                    />
                    {(form.image || imageFile) && (
                      <div className="mt-2 relative w-20 h-20 border border-copper-500/20">
                        <Image
                          src={imageFile ? URL.createObjectURL(imageFile) : form.image}
                          alt="preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    { key: 'featured', label: 'Featured', icon: <Star size={12} /> },
                    { key: 'price_on_request', label: 'Price on Request', icon: <Tag size={12} /> },
                    { key: 'enable_whatsapp_inquiry', label: 'WhatsApp Inquiry', icon: <MessageCircle size={12} /> },
                    { key: 'enable_email_inquiry', label: 'Email Inquiry', icon: <Mail size={12} /> },
                  ].map(({ key, label, icon }) => (
                    <label
                      key={key}
                      className={`flex items-center gap-2 p-3 border cursor-pointer transition-all duration-200 text-xs font-sans ${form[key as keyof FormData]
                        ? 'border-copper-500/50 bg-copper-500/10 text-copper-400'
                        : 'border-copper-500/15 text-brand-beige/30 hover:border-copper-500/30'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!form[key as keyof FormData]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                        className="sr-only"
                      />
                      {icon} {label}
                    </label>
                  ))}
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-sans text-xs text-red-400 bg-red-400/5 border border-red-400/20 px-4 py-2"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="btn-copper flex items-center gap-2 disabled:opacity-60"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Save size={14} /> {loading ? 'Saving...' : 'Save Product'}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-ghost-copper"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Table */}
      <div className="glass-card copper-border overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-xl text-brand-beige/30 mb-2">No products yet</p>
            <button type="button" onClick={openAdd} className="btn-copper mt-4 text-xs">Add First Product</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-copper-500/10">
                  <th className={thStyle}>Product</th>
                  <th className={thStyle}>Category</th>
                  <th className={thStyle}>Price</th>
                  <th className={thStyle}>Flags</th>
                  <th className={`${thStyle} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-copper-500/5 transition-all duration-200 hover:bg-copper-500/[0.04] group/row"
                    style={{ boxShadow: 'inset 0 0 0 0 rgba(184,115,51,0)' }}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.image && (
                          <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden border border-copper-500/20">
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                        )}
                        <span className="font-body text-brand-beige/80 text-sm">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-body text-brand-beige/40 text-xs">
                      {p.categories?.name ?? '—'}
                    </td>
                    <td className="px-5 py-4 font-body text-copper-400 text-sm">
                      {p.price_on_request ? <span className="text-xs text-copper-500/50">On Request</span> : p.price ? `₹${p.price.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {p.featured && <span className={badgeCopper}>Featured</span>}
                        {p.enable_whatsapp_inquiry && <span className={badgeGreen}>WA</span>}
                        {p.enable_email_inquiry && <span className={badgeBlue}>Email</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(p)}
                          className="p-2 text-brand-beige/40 hover:text-copper-400 border border-copper-500/10 hover:border-copper-500/30 transition-all duration-200"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="p-2 text-brand-beige/40 hover:text-red-400 border border-copper-500/10 hover:border-red-400/30 transition-all duration-200 disabled:opacity-40"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

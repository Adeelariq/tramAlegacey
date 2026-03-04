'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import type { Category } from '@/types/database'

interface Props {
  initialCategories: Category[]
}

const inputBase = 'w-full bg-brand-black/50 border border-copper-500/20 text-brand-beige font-body text-sm px-4 py-2.5 focus:outline-none focus:border-copper-500/50 transition-all duration-300 input-copper'

export default function CategoriesManager({ initialCategories }: Props) {
  const [categories, setCategories] = useState(initialCategories)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const supabase = createClient()

  const openAdd = () => {
    setName('')
    setImageUrl('')
    setImageFile(null)
    setEditingId(null)
    setError('')
    setShowForm(true)
  }

  const openEdit = (c: Category) => {
    setName(c.name)
    setImageUrl(c.image ?? '')
    setImageFile(null)
    setEditingId(c.id)
    setError('')
    setShowForm(true)
  }

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop()
    const path = `categories/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(path, file, { upsert: true })
    if (error) throw error
    const { data } = supabase.storage.from('images').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    setError('')

    try {
      let finalImage = imageUrl
      if (imageFile) finalImage = await uploadImage(imageFile)

      const payload = { name: name.trim(), image: finalImage || null }

      if (editingId) {
        const { data, error } = await supabase.from('categories').update(payload).eq('id', editingId).select().single()
        if (error) throw error
        setCategories((prev) => prev.map((c) => (c.id === editingId ? (data as Category) : c)))
      } else {
        const { data, error } = await supabase.from('categories').insert(payload).select().single()
        if (error) throw error
        setCategories((prev) => [data as Category, ...prev])
      }

      setShowForm(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving category')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? Products in this category will be unassigned.')) return
    setDeletingId(id)
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (!error) setCategories((prev) => prev.filter((c) => c.id !== id))
    setDeletingId(null)
  }

  return (
    <div className="pt-14 md:pt-0 px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-beige mb-1">Categories</h1>
          <p className="font-body text-brand-beige/40 text-sm">{categories.length} categories total</p>
        </div>
        <motion.button
          onClick={openAdd}
          className="btn-copper flex items-center gap-2 text-xs px-5 py-2.5"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={15} /> Add Category
        </motion.button>
      </div>

      {/* Animated Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="glass-card copper-border w-full max-w-md p-8 relative"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -12 }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-brand-beige/40 hover:text-brand-beige transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="font-display text-xl font-semibold text-brand-beige mb-6">
                {editingId ? 'Edit Category' : 'Add Category'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-copper-400/50 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputBase}
                    placeholder="e.g. Copper Bottles"
                    required
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-copper-400/50 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={`${inputBase} mb-2`}
                    placeholder="https://..."
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                    className="font-sans text-xs text-brand-beige/50"
                  />
                  {(imageUrl || imageFile) && (
                    <div className="mt-3 relative w-20 h-20 border border-copper-500/20">
                      <Image
                        src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                        alt="preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
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
                    <Save size={14} /> {loading ? 'Saving...' : 'Save'}
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

      {/* Categories grid */}
      {categories.length === 0 ? (
        <div className="glass-card copper-border text-center py-20">
          <p className="font-display text-xl text-brand-beige/30 mb-4">No categories yet</p>
          <button onClick={openAdd} className="btn-copper text-xs">Add First Category</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              className="glass-card copper-border overflow-hidden group"
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(184,115,51,0.18)' }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative aspect-video bg-brand-brown">
                {cat.image ? (
                  <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-copper-500/20">
                    <span className="font-display text-4xl">+</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-semibold text-brand-beige">{cat.name}</h3>
                  <p className="font-sans text-[10px] text-brand-beige/30">
                    {new Date(cat.created_at).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(cat)}
                    className="p-2 text-brand-beige/40 hover:text-copper-400 border border-copper-500/10 hover:border-copper-500/30 transition-all duration-200"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    disabled={deletingId === cat.id}
                    className="p-2 text-brand-beige/40 hover:text-red-400 border border-copper-500/10 hover:border-red-400/30 transition-all duration-200 disabled:opacity-40"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

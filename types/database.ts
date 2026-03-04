export interface Category {
  id: string
  name: string
  image: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  price: number | null
  description: string | null
  image: string | null
  category_id: string | null
  featured: boolean
  price_on_request: boolean
  enable_whatsapp_inquiry: boolean
  enable_email_inquiry: boolean
  created_at: string
  categories?: Category
}

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at'>
        Update: Partial<Omit<Category, 'id' | 'created_at'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at'>>
      }
    }
  }
}

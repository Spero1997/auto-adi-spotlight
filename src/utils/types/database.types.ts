
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string
          brand: string
          model: string
          year: number
          mileage: number
          fuel_type: string
          transmission: string
          price: number
          description: string | null
          image_url: string | null
          additional_images: string[] | null
          exterior_color: string | null
          interior_color: string | null
          engine: string | null
          power: number | null
          doors: number | null
          features: string[] | null
          is_featured: boolean
          is_sold: boolean
          in_stock: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand: string
          model: string
          year: number
          mileage: number
          fuel_type: string
          transmission: string
          price: number
          description?: string | null
          image_url?: string | null
          additional_images?: string[] | null
          exterior_color?: string | null
          interior_color?: string | null
          engine?: string | null
          power?: number | null
          doors?: number | null
          features?: string[] | null
          is_featured?: boolean
          is_sold?: boolean
          in_stock?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand?: string
          model?: string
          year?: number
          mileage?: number
          fuel_type?: string
          transmission?: string
          price?: number
          description?: string | null
          image_url?: string | null
          additional_images?: string[] | null
          exterior_color?: string | null
          interior_color?: string | null
          engine?: string | null
          power?: number | null
          doors?: number | null
          features?: string[] | null
          is_featured?: boolean
          is_sold?: boolean
          in_stock?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          client_photo: string | null
          rating: number
          comment: string
          vehicle_id: string | null
          is_approved: boolean
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_photo?: string | null
          rating: number
          comment: string
          vehicle_id?: string | null
          is_approved?: boolean
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_photo?: string | null
          rating?: number
          comment?: string
          vehicle_id?: string | null
          is_approved?: boolean
          featured?: boolean
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          vehicle_id: string | null
          client_name: string
          client_email: string
          amount: number
          payment_method: string
          transaction_id: string | null
          status: string
          is_deposit: boolean
          payment_date: string
          notes: string | null
        }
        Insert: {
          id?: string
          vehicle_id?: string | null
          client_name: string
          client_email: string
          amount: number
          payment_method: string
          transaction_id?: string | null
          status: string
          is_deposit?: boolean
          payment_date?: string
          notes?: string | null
        }
        Update: {
          id?: string
          vehicle_id?: string | null
          client_name?: string
          client_email?: string
          amount?: number
          payment_method?: string
          transaction_id?: string | null
          status?: string
          is_deposit?: boolean
          payment_date?: string
          notes?: string | null
        }
      }
      promotions: {
        Row: {
          id: string
          code: string
          discount_percentage: number | null
          discount_amount: number | null
          minimum_purchase: number | null
          start_date: string
          end_date: string
          is_active: boolean
          usage_limit: number | null
          usage_count: number
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          discount_percentage?: number | null
          discount_amount?: number | null
          minimum_purchase?: number | null
          start_date: string
          end_date: string
          is_active?: boolean
          usage_limit?: number | null
          usage_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          discount_percentage?: number | null
          discount_amount?: number | null
          minimum_purchase?: number | null
          start_date?: string
          end_date?: string
          is_active?: boolean
          usage_limit?: number | null
          usage_count?: number
          created_at?: string
        }
      }
      stats: {
        Row: {
          id: string
          date: string
          page_views: number
          unique_visitors: number
          sales_count: number
          sales_amount: number
          leads_count: number
          popular_vehicle_ids: string[]
        }
        Insert: {
          id?: string
          date: string
          page_views?: number
          unique_visitors?: number
          sales_count?: number
          sales_amount?: number
          leads_count?: number
          popular_vehicle_ids?: string[]
        }
        Update: {
          id?: string
          date?: string
          page_views?: number
          unique_visitors?: number
          sales_count?: number
          sales_amount?: number
          leads_count?: number
          popular_vehicle_ids?: string[]
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      vehicle_tags: {
        Row: {
          vehicle_id: string
          tag_id: string
        }
        Insert: {
          vehicle_id: string
          tag_id: string
        }
        Update: {
          vehicle_id?: string
          tag_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

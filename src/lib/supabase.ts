import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company_name: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          postal_code: string | null;
          country: string;
          role: 'client' | 'admin' | 'staff';
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company_name?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          postal_code?: string | null;
          country?: string;
          role?: 'client' | 'admin' | 'staff';
          stripe_customer_id?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          company_name?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          postal_code?: string | null;
          country?: string;
          role?: 'client' | 'admin' | 'staff';
          stripe_customer_id?: string | null;
        };
      };
      categories: {
        Row: {
          id: number;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
      };
      products: {
        Row: {
          id: number;
          name: string;
          slug: string;
          category_id: number | null;
          short_description: string | null;
          long_description: string | null;
          price: number;
          old_price: number | null;
          image_url: string | null;
          gallery_images: string[] | null;
          features: string[] | null;
          system_requirements: string[] | null;
          download_size: string | null;
          version: string | null;
          license_type: string;
          max_activations: number;
          support_duration_months: number;
          download_url: string | null;
          is_popular: boolean;
          is_featured: boolean;
          is_active: boolean;
          stock_quantity: number;
          rating: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
          subtotal: number;
          discount_amount: number;
          tax_amount: number;
          total_amount: number;
          currency: string;
          payment_method: string | null;
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          stripe_payment_intent_id: string | null;
          promo_code: string | null;
          billing_address: any | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          order_number: string;
          status?: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
          subtotal: number;
          discount_amount?: number;
          tax_amount?: number;
          total_amount: number;
          currency?: string;
          payment_method?: string | null;
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          stripe_payment_intent_id?: string | null;
          promo_code?: string | null;
          billing_address?: any | null;
          notes?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: number | null;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at: string;
        };
        Insert: {
          order_id: string;
          product_id: number | null;
          quantity?: number;
          unit_price: number;
          total_price: number;
        };
      };
      licenses: {
        Row: {
          id: string;
          order_item_id: string | null;
          user_id: string;
          product_id: number;
          license_key: string;
          status: 'active' | 'suspended' | 'expired' | 'revoked';
          activation_count: number;
          max_activations: number;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      promo_codes: {
        Row: {
          id: number;
          code: string;
          description: string | null;
          discount_type: 'percentage' | 'fixed';
          discount_value: number;
          min_amount: number;
          max_discount: number | null;
          usage_limit: number | null;
          used_count: number;
          is_active: boolean;
          starts_at: string;
          expires_at: string | null;
          created_at: string;
        };
      };
    };
  };
}
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  short_description: string;
  long_description: string;
  price: number;
  old_price?: number;
  image_url: string;
  gallery_images?: string[];
  features?: string[];
  system_requirements?: string[];
  download_size?: string;
  version?: string;
  license_type: string;
  max_activations?: number;
  support_duration_months?: number;
  download_url?: string;
  is_popular: boolean;
  is_featured: boolean;
  is_active: boolean;
  stock_quantity?: number;
  rating?: number;
  review_count?: number;
  created_at: string;
  updated_at: string;
}

export const useSupabaseProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: number): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  const getProductBySlug = async (slug: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  const getFeaturedProducts = async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching featured products:', err);
      return [];
    }
  };

  const getPopularProducts = async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('is_popular', true)
        .order('rating', { ascending: false })
        .limit(6);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching popular products:', err);
      return [];
    }
  };

  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,short_description.ilike.%${query}%,long_description.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Error searching products:', err);
      return [];
    }
  };

  const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching products by category:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    getProductBySlug,
    getFeaturedProducts,
    getPopularProducts,
    searchProducts,
    getProductsByCategory
  };
};
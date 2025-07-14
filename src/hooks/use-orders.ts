import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './use-auth';

export interface OrderItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

export interface BillingAddress {
  full_name: string;
  company_name?: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postal_code?: string;
  country: string;
}

export const useOrders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const createOrder = async (
    items: OrderItem[],
    billingAddress: BillingAddress,
    promoCode?: string
  ) => {
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    try {
      setLoading(true);

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      let discountAmount = 0;

      // Apply promo code if provided
      if (promoCode) {
        const promoResult = await validatePromoCode(promoCode, subtotal);
        if (promoResult.valid) {
          discountAmount = promoResult.discount;
        }
      }

      const taxRate = 0.15; // 15% tax
      const taxAmount = (subtotal - discountAmount) * taxRate;
      const totalAmount = subtotal - discountAmount + taxAmount;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          payment_status: 'pending',
          subtotal,
          tax_amount: taxAmount,
          discount_amount: discountAmount,
          total_amount: totalAmount,
          promo_code: promoCode || null,
          billing_address: billingAddress,
          payment_method: 'card',
          currency: 'EUR'
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: parseInt(item.product.id),
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      // For demo purposes, immediately mark as completed
      // In a real app, this would be done by payment webhook
      const { data: completedOrder, error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: 'completed',
          payment_status: 'paid'
        })
        .eq('id', order.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      return { data: completedOrder, error: null };
    } catch (error) {
      console.error('Error creating order:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to create order' 
      };
    } finally {
      setLoading(false);
    }
  };

  const validatePromoCode = async (code: string, orderAmount: number) => {
    try {
      const { data: promoCode, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error || !promoCode) {
        return { valid: false, error: 'Code promo invalide ou expiré', discount: 0 };
      }

      // Check if expired
      if (promoCode.expires_at && new Date(promoCode.expires_at) < new Date()) {
        return { valid: false, error: 'Ce code promo a expiré', discount: 0 };
      }

      // Check usage limit
      if (promoCode.usage_limit && promoCode.used_count >= promoCode.usage_limit) {
        return { valid: false, error: 'Ce code promo a atteint sa limite d\'utilisation', discount: 0 };
      }

      // Check minimum amount
      if (promoCode.min_amount && orderAmount < promoCode.min_amount) {
        return { 
          valid: false, 
          error: `Montant minimum requis: ${promoCode.min_amount}€`, 
          discount: 0 
        };
      }

      // Calculate discount
      let discount = 0;
      if (promoCode.discount_type === 'percentage') {
        discount = (orderAmount * promoCode.discount_value) / 100;
        if (promoCode.max_discount && discount > promoCode.max_discount) {
          discount = promoCode.max_discount;
        }
      } else if (promoCode.discount_type === 'fixed') {
        discount = Math.min(promoCode.discount_value, orderAmount);
      }

      return { valid: true, error: null, discount };
    } catch (error) {
      console.error('Error validating promo code:', error);
      return { valid: false, error: 'Erreur lors de la validation du code', discount: 0 };
    }
  };

  const getUserOrders = async () => {
    if (!user) return [];

    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (name, license_type)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return orders || [];
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }
  };

  const getOrderById = async (orderId: string) => {
    if (!user) return null;

    try {
      const { data: order, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (name, license_type)
          )
        `)
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        throw error;
      }

      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  const getUserLicenses = async () => {
    if (!user) return [];

    try {
      const { data: licenses, error } = await supabase
        .from('licenses')
        .select(`
          *,
          products (name, license_type),
          order_items!inner (
            orders!inner (created_at)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform the data to include product name
      const transformedLicenses = licenses?.map(license => ({
        ...license,
        product_name: license.products?.name || 'Unknown Product',
        license_type: license.products?.license_type || 'Standard License'
      })) || [];

      return transformedLicenses;
    } catch (error) {
      console.error('Error fetching user licenses:', error);
      return [];
    }
  };

  return {
    createOrder,
    validatePromoCode,
    getUserOrders,
    getOrderById,
    getUserLicenses,
    loading
  };
};
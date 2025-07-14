export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  features: string[];
  icon: any;
  license: string;
  activations: string;
  support: string;
  popular: boolean;
  featured?: boolean;
  detailedDescription?: string;
  systemRequirements?: string[];
  downloadSize?: string;
  version?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PromoCode {
  code: string;
  discount: number; // percentage
  type: 'percentage' | 'fixed';
  minAmount?: number;
  maxDiscount?: number;
  expiresAt?: Date;
  usageLimit?: number;
  usedCount?: number;
}
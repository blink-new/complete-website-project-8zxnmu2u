import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { availablePromoCodes } from '../lib/promo-codes';
import { Product, CartItem, PromoCode } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedPromo?: PromoCode;
  subtotal: number;
  discount: number;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'APPLY_PROMO'; payload: PromoCode }
  | { type: 'REMOVE_PROMO' }
  | { type: 'CALCULATE_TOTALS' };

const initialState: CartState = {
  items: [],
  isOpen: false,
  subtotal: 0,
  discount: 0,
  total: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.payload, quantity: 1 }],
        };
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== action.payload.id),
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        appliedPromo: undefined,
      };
    }

    case 'TOGGLE_CART': {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }

    case 'APPLY_PROMO': {
      return {
        ...state,
        appliedPromo: action.payload,
      };
    }

    case 'REMOVE_PROMO': {
      return {
        ...state,
        appliedPromo: undefined,
      };
    }

    case 'CALCULATE_TOTALS': {
      const subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      let discount = 0;
      if (state.appliedPromo) {
        if (subtotal >= (state.appliedPromo.minAmount || 0)) {
          if (state.appliedPromo.type === 'percentage') {
            discount = (subtotal * state.appliedPromo.discount) / 100;
            if (state.appliedPromo.maxDiscount) {
              discount = Math.min(discount, state.appliedPromo.maxDiscount);
            }
          } else {
            discount = state.appliedPromo.discount;
          }
        }
      }

      const total = Math.max(0, subtotal - discount);

      return {
        ...state,
        subtotal,
        discount,
        total,
      };
    }

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  getItemCount: () => number;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export { CartContext };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Recalculer les totaux à chaque changement
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.items, state.appliedPromo]);

  // Sauvegarder le panier dans localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({
      items: state.items,
      appliedPromo: state.appliedPromo,
    }));
  }, [state.items, state.appliedPromo]);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const { items, appliedPromo } = JSON.parse(savedCart);
        if (items && Array.isArray(items)) {
          items.forEach((item: CartItem) => {
            dispatch({ type: 'ADD_ITEM', payload: item.product });
            if (item.quantity > 1) {
              dispatch({ 
                type: 'UPDATE_QUANTITY', 
                payload: { id: item.product.id, quantity: item.quantity } 
              });
            }
          });
        }
        if (appliedPromo) {
          dispatch({ type: 'APPLY_PROMO', payload: appliedPromo });
        }
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
      }
    }
  }, []);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const applyPromoCode = (code: string): boolean => {
    const promoCode = availablePromoCodes.find(
      promo => promo.code.toLowerCase() === code.toLowerCase()
    );

    if (promoCode) {
      const subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      if (subtotal >= (promoCode.minAmount || 0)) {
        dispatch({ type: 'APPLY_PROMO', payload: promoCode });
        return true;
      }
    }
    return false;
  };

  const removePromoCode = () => {
    dispatch({ type: 'REMOVE_PROMO' });
  };

  const getItemCount = (): number => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: number): boolean => {
    return state.items.some(item => item.product.id === productId);
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    applyPromoCode,
    removePromoCode,
    getItemCount,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
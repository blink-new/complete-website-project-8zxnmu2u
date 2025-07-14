import { PromoCode } from '../types';

// Codes promo disponibles
export const availablePromoCodes: PromoCode[] = [
  {
    code: 'WELCOME20',
    discount: 20,
    type: 'percentage',
    minAmount: 50,
    maxDiscount: 100,
  },
  {
    code: 'SAVE50',
    discount: 50,
    type: 'fixed',
    minAmount: 100,
  },
  {
    code: 'FIRST30',
    discount: 30,
    type: 'percentage',
    minAmount: 30,
  },
  {
    code: 'BUNDLE15',
    discount: 15,
    type: 'percentage',
    minAmount: 80,
  },
];
import type { Product } from "./product.types";

export type PromoDetails = {
  id: string;
  description: string;
  totalPromoApplied: number;
};

export type ApplyFreeGiftResult =
    | {valid: true; type: PromoType; gifts: (Product & { quantity: number })[]; promoDetails: PromoDetails}
    | {valid: false; message: string};

export type ApplyFreeFigureResult = 
    | {valid: true; type: PromoType; discount: number; appliedTo: (Product & { quantity: number })[], promoDetails: PromoDetails}
    | {valid: false; message: string}

export type ApplyFreeShippingResult = 
    | {valid: true; type: PromoType; totalShipping: number; promoDetails: PromoDetails}
    | {valid: false; totalShipping: number}

export type GiftSummary = {
    name: string;      
    quantity: number;
    reason: string 
}

export const PromoType = {
  FIGURE_DISCOUNT: '3x2_figures',
  GIFT: 'gift',
  SHIPPING: 'free_shipping'
} as const;

export type PromoType = typeof PromoType[keyof typeof PromoType];

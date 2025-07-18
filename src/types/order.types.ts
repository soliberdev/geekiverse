import type { Product, ProductCombo, ProductPromotion } from "./product.types";

export interface CartItem {
    productId: number;
    quantity: number;
}

export interface ComboCartItem {
    comboId: number;
    quantity: number;
}

export interface ShoppingCart {
    items: CartItem[];
    combos: ComboCartItem[];
}

export interface StockAvailability {
    valid: boolean;
    remaining: number;
    required: number;
    message?: string;
}

export type CartTotal = {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    gifts: (Product & { quantity: number })[];
    appliedPromotions: AppliedPromotion[];
}

export type AppliedPromotion = 
    | {
        type: 'discount';
        id: string;
        description: string;
        reason: string;
        totalApplied: number;
        value: number;
      }
    | {
        type: 'gift';
        id: string;
        description: string;
        reason: string;
        giftItems: { id: number; name: string; quantity: number }[];
      }
    | {
        type: 'shipping';
        id: string;
        description: string;
        reason: string;
        value: number;
      };

export type OrderStatus =
    | 'empty'
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export interface Order {
    products: Product[];
    combos: ProductCombo[];
    promotions: ProductPromotion[];
    totalPrice: number;
    totalDiscount: number;
    totalShipping: number;
    totalFinal: number;
    shippingAddress: string;
    status: OrderStatus;
    paymentMethod: 'cash_on_delivery';
}
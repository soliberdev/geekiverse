export interface Translations {
    es: string;
    en: string;
}

export type ProductCategoryId = 
    | 'figures'
    | 'clothing'
    | 'decor'
    | 'drinks'
    | 'snacks'
    | 'accessories';

export interface Product {
    id: number;
    slug: string;
    name: Translations;
    description: Translations;
    currency: string;
    price: number;
    imageUrl: string;
    categoryId: ProductCategoryId;
    stock: number;
}

export interface ProductCombo {
    id: number;
    name: Translations;
    description: Translations;
    products: number[];
    currency: string;
    comboPrice: number;
}

export interface ProductCategory {
    id: ProductCategoryId;
    name: Translations;
    description: Translations;
    icon: string;
}

export interface DiscountCondition {
    category: ProductCategoryId;
    minQuantity: number;
    payFor: number; 
}

export interface ShippingCondition {
    minPurchase: number;
}

export interface GiftCondition {
    comboPurchase: boolean;
    gift: string;
}

export interface DiscountPromotion {
    id: string;
    type: 'discount';
    description: Translations;
    condition: DiscountCondition;
}

export interface ShippingPromotion {
    id: string;
    type: 'shipping';
    description: Translations;
    condition: ShippingCondition;
}

export interface GiftPromotion {
    id: string;
    type: 'gift';
    description: Translations;
    condition: GiftCondition;
}

export type ProductPromotion = 
    | DiscountPromotion
    | ShippingPromotion
    | GiftPromotion;
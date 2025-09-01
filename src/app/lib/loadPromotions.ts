import type { ProductPromotion } from '../types/product.types';

export const loadPromotions = async (): Promise<ProductPromotion[]> => {
    try {
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

        const response = await fetch(`${baseUrl}/data/promotions.json`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Couldn't load promotions.json (${response.status})`);
        }

        return (await response.json()) as ProductPromotion[];
    } catch (error) {
        console.error('Error loading promotions:', error);
        throw error;
    }
};
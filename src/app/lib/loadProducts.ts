import type { Product } from '../types/product.types';

export const loadProducts = async (): Promise<Product[]> => {
    try {
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

        const response = await fetch(`${baseUrl}/data/products.json`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Couldn't load products.json (${response.status})`);
        }

        return (await response.json()) as Product[];
    } catch (error) {
        console.error('Error loading products:', error);
        throw error;
    }
};
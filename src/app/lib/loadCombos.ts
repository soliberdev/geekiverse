import type { ProductCombo } from "../types/product.types";

export const loadCombos = async (): Promise<ProductCombo[]> => {
    try {
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

        const response = await fetch(`${baseUrl}/data/combos.json`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Couldn't load combos.json (${response.status})`);
        }
        
        return (await response.json()) as ProductCombo[];
    } catch (error) {
        console.error('Error loading combos:', error);
        throw error;
    }
}
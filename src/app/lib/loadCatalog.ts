import { loadProducts } from './loadProducts';
import { loadCombos } from './loadCombos';
import type { Product, ProductCombo } from '../types/product.types';

export const loadCatalog = async (): Promise<{products: Product[]; combos: ProductCombo[];}> => {
    const [products, combos] = await Promise.all([loadProducts(), loadCombos()]);
    return { products, combos };
};

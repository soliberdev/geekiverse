import { z } from 'zod';
import { tool } from 'ai';
import { getCombos, getProducts } from '@/app/utils/productsUtils';
import type { CatalogResult } from '@/app/types/product.types';
import { loadCatalog } from '@/app/lib/loadCatalog';

const pickLang = (obj: { es?: string; en?: string } | undefined, locale: 'es' | 'en') =>
  obj?.[locale] ?? obj?.[locale === 'es' ? 'en' : 'es'] ?? '';

export const searchCatalog = tool({
  description: 'Return the catalog of products and combos with pagination.',
  inputSchema: z.object({
    locale: z.enum(['es', 'en']).default('es'),
    pageProducts: z.number().default(1),
    pageCombos: z.number().default(1),
    pageSizeProducts: z.number().default(3),
    pageSizeCombos: z.number().default(2),
  }),
  async execute({ locale = 'es', pageProducts, pageCombos, pageSizeProducts, pageSizeCombos }): Promise<CatalogResult> {
    const catalog = await loadCatalog();
    
    const productsResult = getProducts(catalog.products, pageProducts, pageSizeProducts);
    const combosResult   = getCombos(catalog.combos, pageCombos, pageSizeCombos);

    const localizedProducts = productsResult.items.map((p) => ({
      ...p,
      nameText: pickLang(p.name, locale),
      descriptionText: pickLang(p.description, locale),
    }));

    const localizedCombos = combosResult.items.map((c) => ({
      ...c,
      nameText: pickLang(c.name, locale),
      descriptionText: pickLang(c.description, locale),
    }));

    return {
      products: { 
        items: localizedProducts, 
        totalItems: productsResult.totalItems,
        currentPage: productsResult.currentPage,
        pageSize: productsResult.pageSize,
        totalPages: productsResult.totalPages,
        remaining: productsResult.remaining,
        hasNext: productsResult.hasNext,
        hasPrev: productsResult.hasPrev
      },
      combos:   { 
        items: localizedCombos,   
        totalItems: combosResult.totalItems,
        currentPage: combosResult.currentPage,
        pageSize: combosResult.pageSize,
        totalPages: combosResult.totalPages,
        remaining: combosResult.remaining,
        hasNext: combosResult.hasNext,
        hasPrev: combosResult.hasPrev
      },
    };
  },
});
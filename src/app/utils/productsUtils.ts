import { Product, ProductCombo } from "../types/product.types"

export const getProducts = (products: Product[], page = 1, pageSize = 5) => {
    const totalItems = products.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = products.slice(start, end);

    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const remaining = Math.max(totalItems - end, 0);

    return (
        {
            items,
            totalItems,
            currentPage: page,
            pageSize,
            totalPages,
            remaining,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        }
    )

};

export const getCombos = (combos: ProductCombo[], page = 1, pageSize = 3) => {
    const totalItems = combos.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = combos.slice(start, end);

    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const remaining = Math.max(totalItems - end, 0);

    return (
        { 
            items,
            totalItems,
            currentPage: page,
            pageSize,
            totalPages,
            remaining,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        }
    )

}
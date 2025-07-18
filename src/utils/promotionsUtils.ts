import type { ShoppingCart } from "../types/order.types";
import { PromoType, type ApplyFreeFigureResult, type ApplyFreeGiftResult, type ApplyFreeShippingResult } from "../types/promotions.types";
import type { Product, ProductCombo, ProductPromotion } from "../types/product.types";
import { ensureStockAvailable } from "./shoppingCartUtils";

export const applyPromotions = (cart: ShoppingCart, products: Product[], allCombos: ProductCombo[], promotions: ProductPromotion[], subtotal: number): {discount: ApplyFreeFigureResult; shipping: ApplyFreeShippingResult; gifts: ApplyFreeGiftResult} => {

    const shipping = applyFreeShippingPromo(subtotal, promotions);
    const discount = apply3x2Promo(cart, products, promotions);
    const gifts = applyFreeGiftPromo(cart, products, allCombos, promotions);

    return {
        discount,
        shipping,
        gifts
    };
}

export const applyFreeShippingPromo = (subtotal: number, promotions: ProductPromotion[], baseShipping: number = 12) : ApplyFreeShippingResult => {
    const promotion = promotions.find(promo => promo.type === 'shipping');
    if (promotion && subtotal >= promotion.condition.minPurchase) {
        return {
            valid: true,
            type: PromoType.SHIPPING,
            totalShipping: 0,
            promoDetails: {
                id: promotion.id,
                description: promotion.description.en,
                reason: `Shipping waived due to order total of $${subtotal}`,
                totalPromoApplied: 1
            }
        };
    }

    return ({
        valid: false,
        totalShipping: baseShipping
    });
}

export const applyFreeGiftPromo = ({items, combos}: ShoppingCart, products: Product[], allCombos: ProductCombo[], promotions: ProductPromotion[]): ApplyFreeGiftResult => {
  
    const promotion = promotions.find(promo => promo.type === 'gift');
    if (!promotion) {
        return {
            valid: false,
            message: 'No se encontró la promoción de regalo.'
        };
    }

    if (combos.length === 0) {
        return {
            valid: false,
            message: 'La promoción de regalo aplica solo si hay combos en el carrito.'
        };
    }

    const giftSlug = promotion?.condition.gift;
    if (!giftSlug) {
        return {
            valid: false,
            message: 'Producto de regalo no válido.'
        };
    }

    const gift = products.find(product => product.slug === giftSlug);
    if (!gift) {
        return {
            valid: false,
            message: 'Producto de regalo no disponible.'
        };
    }

    const giftQuantityCombo = combos.reduce((sum, combo) => sum + combo.quantity, 0);

    try {
        ensureStockAvailable(items, combos, gift.id, giftQuantityCombo, gift.stock, allCombos);

        return {
            valid: true,
            type: PromoType.GIFT,
            gifts: [{ ...gift, quantity: giftQuantityCombo }],
            promoDetails: {
                id: promotion.id,
                description: promotion.description.en,
                reason: `You received ${giftQuantityCombo} free gift(s) for purchasing ${combos.length} combo(s)`,
                totalPromoApplied: combos.length
            }
        };
    } catch (error) {
        return {
            valid: false,
            message: 'No hay stock suficiente para aplicar el regalo gratuito.'
        };
    }
};

export const apply3x2Promo = ({items}: ShoppingCart, products: Product[], promotions: ProductPromotion[]): ApplyFreeFigureResult  => {
    const promotion = promotions.find(promo => promo.type === 'discount');
    if (!promotion) {
        return {
            valid: false,
            message: 'No se encontró la promoción de regalo.'
        };
    }

    const figureItems = items.filter(item =>
        products.find(product => product.id === item.productId && product.categoryId === 'figures')
    );

    const figures = figureItems.map(figure => {
        const figureInfo = products.find(item => item.id === figure.productId);
        if (!figureInfo) return null;
        return(
            {
                productId: figureInfo.id,
                price: figureInfo.price,

                quantity: figure.quantity 
            }
        )
    }).filter((item): item is { productId: number; price: number; quantity: number } => item !== null);

    let groupedFigures: {productId: number; price: number}[] = [];

    figures.forEach(figure => {
        for (let i = 0; i < figure.quantity; i++) {
            groupedFigures.push({
                productId: figure.productId,
                price: figure.price
            });
        }
    });

    groupedFigures.sort((figA, figB) => figA.price - figB.price);

    let totalDiscount = 0;
    let freeFigures: number[] = [];
    let totalPromoApplied = 0;

    for (let i = 0; i + 2 < groupedFigures.length; i += promotion.condition.minQuantity) {
        totalDiscount += groupedFigures[i].price;
        freeFigures.push(groupedFigures[i].productId);
        totalPromoApplied++;
    }

    const groupedGifts = freeFigures.reduce<Record<number, Product & { quantity: number }>>((acc, figureId) => {
        const product = products.find(product => product.id === figureId);
        if (!product) return acc;

        if (!acc[figureId]) {
            acc[figureId] = {
                ...product,
                quantity: 1
            };
        } else {
            acc[figureId].quantity += 1;
        }

        return acc;
    }, {});

    const gifts:(Product & { quantity: number })[] = Object.values(groupedGifts);

    return {
        valid: true,
        type: PromoType.FIGURE_DISCOUNT,
        discount: totalDiscount,
        appliedTo: gifts,
        promoDetails: {
            id: promotion.id,
            description: promotion.description.en,
            reason: `You saved $${totalDiscount} on ${totalPromoApplied} free figure(s)`,
            totalPromoApplied
        }
    }
}
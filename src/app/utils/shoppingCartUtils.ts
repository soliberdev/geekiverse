import type { CartItem, CartTotal, ComboCartItem, ShoppingCart, StockAvailability, AppliedPromotion } from "../types/order.types";
import type { Product, ProductCombo, ProductPromotion } from "../types/product.types";
import { applyPromotions } from "./promotionsUtils"; 

const productOrComboIdMissingMessage: string = 'A productId or comboId must be provided';

export const addToCart = ( cart: ShoppingCart, {productId, comboId, quantity}: { productId?: number; comboId?: number; quantity: number }, products: Product[], combos: ProductCombo[] ): ShoppingCart => {

    if (productId !== undefined) {
        const product = products.find(p => p.id === productId);
        if (!product) throw new Error('Product not found');
        const updatedItems = addItemToShoppingCart(cart.items, productId, quantity, product.stock, cart.combos, combos);
        return {...cart, items: updatedItems};
    }

    if (comboId !== undefined) {
        const updatedCombos = addComboToShoppingCart(cart.combos, comboId, quantity, products, combos, cart.items);
        return {...cart, combos: updatedCombos};
    }

    throw new Error(productOrComboIdMissingMessage);
};

export const removeFromCart = ( cart: ShoppingCart, {productId, comboId}: { productId?: number; comboId?: number;}): ShoppingCart => {

    if (productId !== undefined) {
        const updatedItems = removeItemFromShoppingCart(cart.items, productId);
        return {...cart, items: updatedItems};
    }

    if (comboId !== undefined) {
        const updatedCombos = removeComboFromShoppingCart(cart.combos, comboId);
        return {...cart, combos: updatedCombos};
    }

    throw new Error(productOrComboIdMissingMessage);
}

export const decreaseFromCart = (cart: ShoppingCart, {productId, comboId, quantity}: {productId?: number; comboId?: number; quantity: number;}) => { 

    if(productId !== undefined) {
        const updatedItems = decreaseItemFromShoppingCart(cart.items, productId, quantity);
        return {...cart, items: updatedItems}
    }

    if(comboId !== undefined){
        const updatedCombos = decreaseComboFromShoppingCart(cart.combos, comboId, quantity);
        return {...cart, combos: updatedCombos}
    }

    throw new Error(productOrComboIdMissingMessage);
} 

//  Add new item or combo to shopping Cart
export const addItemToShoppingCart = (cartItems: CartItem[], productId: number, quantity: number, availableStock: number, comboCartItems: ComboCartItem[], allCombos: ProductCombo[] ) : CartItem[] => {

    ensureStockAvailable(cartItems, comboCartItems, productId, quantity, availableStock, allCombos);

    const exists = cartItems.some(item => item.productId === productId);

    if(exists) {
        return cartItems.map(item =>
            item.productId === productId
                ? { productId: item.productId, quantity: item.quantity + quantity }
                : item
        );
    } else {
        return [...cartItems, { productId, quantity }];
    }
};

export const addComboToShoppingCart = (comboCartItems: ComboCartItem[], comboId: number, quantity: number, products: Product[], allCombos: ProductCombo[], cartItems: CartItem[]): ComboCartItem[] => {

    const combo = allCombos.find(combo => combo.id === comboId);

    if(!combo) {
        throw new Error(`Combo with ID ${comboId} does not exist.`);
    }

    for (const productId of combo.products) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} not found for combo ${comboId}.`);
        }
        ensureStockAvailable(cartItems, comboCartItems, productId, quantity, product.stock, allCombos);
    }

    const exists = comboCartItems.some(item => item.comboId === comboId);
    if (exists) {
        return comboCartItems.map(item =>
            item.comboId === comboId
                ? { comboId: item.comboId, quantity: item.quantity + quantity }
                : item
        );
    } else {
        return [...comboCartItems, { comboId, quantity }];
    }
}

// Remove all item or combo from shopping cart
export const removeItemFromShoppingCart = (cartItems: CartItem[], productId: number) : CartItem[] => {
    return cartItems.filter(item => item.productId !== productId);
};

export const removeComboFromShoppingCart = (comboCartItems: ComboCartItem[], comboId: number) : ComboCartItem[] => {
    return comboCartItems.filter(combo => combo.comboId !== comboId);
};

// Reduce quantity of an item or combo
export const decreaseItemFromShoppingCart = (cartItems: CartItem[], productId: number, quantity: number) : CartItem[] => {

    if(cartItems.some(item => item.productId === productId)){
        const updatedCart = cartItems.map(item =>
            item.productId === productId
            ? { productId: item.productId, quantity: item.quantity - quantity }
            : item
        ).filter(item => item.quantity > 0);

        return updatedCart;
    } else {
        return [...cartItems];
    }
};

export const decreaseComboFromShoppingCart = (comboCartItems: ComboCartItem[], comboId: number, quantity: number) : ComboCartItem[] => {

    if(comboCartItems.some(item => item.comboId === comboId)){
        const updatedCart = comboCartItems.map(item =>
            item.comboId === comboId
            ? { comboId: item.comboId, quantity: item.quantity - quantity }
            : item
        ).filter(item => item.quantity > 0);

        return updatedCart;
    } else {
        return [...comboCartItems];
    }
};

//  SHOPPING CART (COMBOS + INDIVIDUAL PRODUCTS)
export const getCartItemQuantity = (cartItems: CartItem[], productId: number, comboCartItems: ComboCartItem[], allCombos: ProductCombo[]) : number => {

    let totalItemQuantity = 0;

    const individualItem = cartItems.find(item => item.productId === productId);
    if (individualItem) {
        totalItemQuantity += individualItem.quantity;
    }

    comboCartItems.forEach(comboCartItem => {
        const combo = allCombos.find(c => c.id === comboCartItem.comboId);
        if (combo && combo.products.includes(productId)) {
            totalItemQuantity += comboCartItem.quantity;
        }
    });

    return totalItemQuantity;
};

export const validateStockAvailability = (currentCartQuantity: number, quantityToAdd: number, availableStock: number) : StockAvailability => {

    const totalRequested  = currentCartQuantity + quantityToAdd;
    const remaining = availableStock - currentCartQuantity;

    if (totalRequested  > availableStock) {
        return {
            valid: false,
            remaining,
            required: quantityToAdd,
            message: `Only ${remaining} units available. You tried to add ${quantityToAdd}.`
        };
    }

    return {
        valid: true,
        remaining: availableStock - totalRequested,
        required: quantityToAdd
    };
}

export const ensureStockAvailable = (cartItems: CartItem[],comboCartItems: ComboCartItem[],productId: number,quantityToAdd: number,productStock: number,allCombos: ProductCombo[]): void => {

    const currentQuantity = getCartItemQuantity(cartItems, productId, comboCartItems, allCombos);
    const result = validateStockAvailability(currentQuantity, quantityToAdd, productStock);

    if (!result.valid) {
        throw new Error(result.message);
    }
};

export const getTotalQuantityInCart = ({ items, combos }: ShoppingCart): number => {

    const itemsTotal = items.reduce((sum, item) => sum + item.quantity, 0);
    const combosTotal = combos.reduce((sum, combo) => sum + combo.quantity, 0);
    return itemsTotal + combosTotal;
};

export const clearShoppingCart = (): ShoppingCart => ({
    items: [],
    combos: []
});

// ================= SUBTOTAL AND TOTAL =================
export const calculateCartSubtotal = ({ items, combos }: ShoppingCart, products: Product[], allCombos: ProductCombo[]): number => {
    return getSubtotalFromItems(items, products) + getSubtotalFromCombos(combos, allCombos);
};

const getSubtotalFromItems = (items: CartItem[], products: Product[]): number => {
    return items.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return product ? sum + product.price * item.quantity : sum;
    }, 0);
};

const getSubtotalFromCombos = (combos: ComboCartItem[], allCombos: ProductCombo[]): number => {
    return combos.reduce((sum, item) => {
        const combo = allCombos.find(c => c.id === item.comboId);
        return combo ? sum + combo.comboPrice * item.quantity : sum;
    }, 0);
};

export const calculateCartTotal = (cart: ShoppingCart, products: Product[], allCombos: ProductCombo[], promotions: ProductPromotion[]): CartTotal => {
    const subtotal = getSubtotalFromItems(cart.items, products) + getSubtotalFromCombos(cart.combos, allCombos);
    const promos = applyPromotions(cart, products, allCombos, promotions, subtotal);

    const discount = promos.discount.valid ? promos.discount.discount || 0 : 0;
    const shipping = promos.shipping.totalShipping;
    const total = subtotal - discount + shipping;

    const appliedPromotions: AppliedPromotion[] = [
        promos.discount.valid && promos.discount.promoDetails
        ? {
            type: promos.discount.type,
            id: promos.discount.promoDetails.id,
            description: promos.discount.promoDetails.description,
            reason: promos.discount.promoDetails.reason,
            totalApplied: promos.discount.promoDetails.totalPromoApplied,
            value: promos.discount.discount
            }
        : null,

        promos.gifts.valid && promos.gifts.promoDetails
        ? {
            type: promos.gifts.type,
            id: promos.gifts.promoDetails.id,
            description: promos.gifts.promoDetails.description,
            reason: promos.gifts.promoDetails.reason,
            giftItems: promos.gifts.gifts.map(g => ({
                id: g.id,
                name: g.name.en,
                quantity: g.quantity
            }))
            }
        : null,

        promos.shipping.valid && promos.shipping.promoDetails
        ? {
            type: promos.shipping.type,
            id: promos.shipping.promoDetails.id,
            description: promos.shipping.promoDetails.description,
            reason: promos.shipping.promoDetails.reason,
            value: 12
            }
        : null
    ].filter(Boolean) as AppliedPromotion[];

    return ({
        subtotal,
        discount,
        shipping,
        total,
        gifts: promos.gifts.valid ? promos.gifts.gifts : [], 
        appliedPromotions
    });
};
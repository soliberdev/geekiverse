import { z } from 'zod';
import { tool } from 'ai';
import { addToCart, removeFromCart, decreaseFromCart, clearShoppingCart, calculateCartSubtotal, calculateCartTotal } from '@/app/utils/shoppingCartUtils';
import { loadCatalog } from '@/app/lib/loadCatalog';
import { loadPromotions } from '@/app/lib/loadPromotions';
import type { ShoppingCart } from '@/app/types/order.types';
import type { ProductPromotion } from '@/app/types/product.types';

const pickLang = (obj: { es?: string; en?: string } | undefined, locale: 'es' | 'en') =>
  obj?.[locale] ?? obj?.[locale === 'es' ? 'en' : 'es'] ?? '';

const formatMoneyUSD = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export const manageCart = tool({
  description: 'Manage cart (add/remove/reduce, clear, summarize, create sort order) and apply promotions',
  inputSchema: z.object({
    locale: z.enum(['es', 'en']).default('es'),
    currency: z.string().default('USD'),
    action: z.enum([
      'addItem',
      'addCombo',
      'removeItem',
      'removeCombo',
      'decreaseItem',
      'decreaseCombo',
      'clear',
      'summary',
      'createOrder',
    ]),
    cart: z.object({
      items: z.array(z.object({ productId: z.number(), quantity: z.number().int().positive() })).default([]),
      combos: z.array(z.object({ comboId: z.number(), quantity: z.number().int().positive() })).default([]),
    }),
    productId: z.number().optional(),
    comboId: z.number().optional(),
    quantity: z.number().int().positive().optional(),
    customer: z
      .object({
        name: z.string(),
        email: z.string().email(),
        address: z.string().optional(),
      })
      .optional(),
  }),
  async execute(input) {
    const {
      locale = 'es',
      action,
      cart: incomingCart,
      productId,
      comboId,
      quantity = 1,
      customer,
    } = input;

    const currency = 'USD';
    const catalog = await loadCatalog();
    const promotions: ProductPromotion[] = await loadPromotions();
    let cart: ShoppingCart = {
      items: incomingCart?.items ?? [],
      combos: incomingCart?.combos ?? [],
    };

    const messages: string[] = [];

    switch (action) {
      case 'addItem': {
        if (productId === undefined) throw new Error('productId requerido');
        cart = addToCart(cart, { productId, quantity }, catalog.products, catalog.combos);
        messages.push(locale === 'es' ? 'Producto agregado al carrito.' : 'Product added to cart.');
        break;
      }
      case 'addCombo': {
        if (comboId === undefined) throw new Error('comboId requerido');
        cart = addToCart(cart, { comboId, quantity }, catalog.products, catalog.combos);
        messages.push(locale === 'es' ? 'Combo agregado al carrito.' : 'Combo added to cart.');
        break;
      }
      case 'removeItem': {
        if (productId === undefined) throw new Error('productId requerido');
        cart = removeFromCart(cart, { productId });
        messages.push(locale === 'es' ? 'Producto eliminado del carrito.' : 'Product removed from cart.');
        break;
      }
      case 'removeCombo': {
        if (comboId === undefined) throw new Error('comboId requerido');
        cart = removeFromCart(cart, { comboId });
        messages.push(locale === 'es' ? 'Combo eliminado del carrito.' : 'Combo removed from cart.');
        break;
      }
      case 'decreaseItem': {
        if (productId === undefined) throw new Error('productId requerido');
        cart = decreaseFromCart(cart, { productId, quantity });
        messages.push(locale === 'es' ? 'Cantidad de producto actualizada.' : 'Product quantity updated.');
        break;
      }
      case 'decreaseCombo': {
        if (comboId === undefined) throw new Error('comboId requerido');
        cart = decreaseFromCart(cart, { comboId, quantity });
        messages.push(locale === 'es' ? 'Cantidad de combo actualizada.' : 'Combo quantity updated.');
        break;
      }
      case 'clear': {
        cart = clearShoppingCart();
        messages.push(locale === 'es' ? 'Carrito vaciado.' : 'Cart cleared.');
        break;
      }
      case 'summary':
      case 'createOrder':
        break;
    }

    const subtotal = calculateCartSubtotal(cart, catalog.products, catalog.combos);
    const totalsRaw = calculateCartTotal(cart, catalog.products, catalog.combos, promotions);

    const localizedGifts = (totalsRaw.gifts ?? []).map(g => ({
      id: g.id,
      name: pickLang(g.name, locale),
      quantity: (g as any).quantity ?? 1,
    }));

    const promoDict = Object.fromEntries(promotions.map(p => [p.id, p]));
    const localizedAppliedPromos = (totalsRaw.appliedPromotions ?? []).map(p => {
      const base = promoDict[p.id];
      const localizedDesc = base ? pickLang(base.description, locale) : p.description;
      return { ...p, description: localizedDesc };
    });

    const totals = {
      currency,
      subtotal,
      discount: totalsRaw.discount,
      shipping: totalsRaw.shipping,
      total: totalsRaw.total,
      gifts: localizedGifts,
      appliedPromotions: localizedAppliedPromos,
      formatted: {
        subtotal: formatMoneyUSD(subtotal),
        discount: formatMoneyUSD(totalsRaw.discount),
        shipping: formatMoneyUSD(totalsRaw.shipping),
        total: formatMoneyUSD(totalsRaw.total),
      },
    };

    let order:
      | {
          id: string;
          status: 'created' | 'paid' | 'shipped';
          customer?: { name: string; email: string; address?: string };
          summary: typeof totals;
        }
      | undefined;

    if (action === 'createOrder') {
      const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
      order = {
        id: orderId,
        status: 'created',
        customer,
        summary: totals,
      };
      messages.push(
        locale === 'es'
          ? `Orden creada (#${orderId}).`
          : `Order created (#${orderId}).`
      );
    }

    return {
      cart,
      totals,
      order,
      messages,
    };
  },
});
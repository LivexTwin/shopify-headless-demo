import { shopifyFetch } from "./shopify.js";

import { CART_CREATE } from "./queries/mutations/cartCreate.js";
import { CART_LINES_ADD } from "./queries/mutations/cartLinesAdd.js";
import { CART_LINES_UPDATE } from "./queries/mutations/cartLinesUpdate.js";
import { CART_LINES_REMOVE } from "./queries/mutations/cartLinesRemove.js";
import { GET_CART } from "./queries/cart.ts";

// PURE API ONLY

export async function getCart(cartId: string) {
  const res = await shopifyFetch(GET_CART, { cartId });
  return res?.cart ?? null;
}

export async function createCart() {
  const res = await shopifyFetch(CART_CREATE);
  const cart = res?.cartCreate?.cart;

  if (!cart?.id) {
    console.error("Cart creation failed:", res?.cartCreate?.userErrors);
    throw new Error("Failed to create cart");
  }

  return cart;
}

export async function addToCart(cartId, variantId, quantity = 1) {
  const lines = [{ merchandiseId: variantId, quantity }];

  const res = await shopifyFetch(CART_LINES_ADD, {
    cartId,
    lines,
  });

  const cart = res?.cartLinesAdd?.cart;

  if (!cart) return null;

  // 🔥 IMPORTANT: re-fetch full cart
  const fullCart = await getCart(cartId);

  return fullCart;
}

export async function updateCartLine(cartId, lineId, quantity) {
  const lines = [{ id: lineId, quantity }];

  const res = await shopifyFetch(CART_LINES_UPDATE, {
    cartId,
    lines,
  });

  return res?.cartLinesUpdate?.cart ?? null;
}

export async function removeCartLine(cartId, lineId) {
  const res = await shopifyFetch(CART_LINES_REMOVE, {
    cartId,
    lineIds: [lineId],
  });

  return res?.cartLinesRemove?.cart ?? null;
}

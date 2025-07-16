import { shopifyFetch } from "./shopify.js";

import { CART_CREATE } from "./queries/mutations/cartCreate.js";
import { CART_LINES_ADD } from "./queries/mutations/cartLinesAdd.js";
import { CART_LINES_UPDATE } from "./queries/mutations/cartLinesUpdate.js";
import { CART_LINES_REMOVE } from "./queries/mutations/cartLinesRemove.js";

import { GET_CART } from "./queries/cart.ts";

export async function getCart(cartId: string) {
  try {
    const res = await shopifyFetch(GET_CART, { cartId });
    if (res?.cart) {
      return res.cart;
    } else {
      console.error("Cart fetch returned no cart");
      return null;
    }
  } catch (err) {
    console.error("Failed to fetch cart:", err);
    return null;
  }
}

export async function createCart() {
  const res = await shopifyFetch(CART_CREATE);
  if (res?.cartCreate?.userErrors?.length) {
    console.error("Cart Create Errors:", res.cartCreate.userErrors);
    return null;
  }
  return res?.cartCreate?.cart ?? null;
}

export async function addToCart(cartId, variantId, quantity = 1) {
  const lines = [{ merchandiseId: variantId, quantity }];
  const res = await shopifyFetch(CART_LINES_ADD, { cartId, lines });
  if (res?.cartLinesAdd?.userErrors?.length) {
    console.error("Add to Cart Errors:", res.cartLinesAdd.userErrors);
    return null;
  }
  return res?.cartLinesAdd?.cart ?? null;
}

export async function updateCartLine(cartId, lineId, quantity) {
  const lines = [{ id: lineId, quantity }];
  const res = await shopifyFetch(CART_LINES_UPDATE, { cartId, lines });
  if (res?.cartLinesUpdate?.userErrors?.length) {
    console.error("Update Cart Line Errors:", res.cartLinesUpdate.userErrors);
    return null;
  }
  return res?.cartLinesUpdate?.cart ?? null;
}

export async function removeCartLine(cartId, lineId) {
  const res = await shopifyFetch(CART_LINES_REMOVE, {
    cartId,
    lineIds: [lineId],
  });
  if (res?.cartLinesRemove?.userErrors?.length) {
    console.error("Remove Cart Line Errors:", res.cartLinesRemove.userErrors);
    return null;
  }
  return res?.cartLinesRemove?.cart ?? null;
}

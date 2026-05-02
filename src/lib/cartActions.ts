import { cartId, cart } from "../stores/cart";
import {
  getCart as apiGetCart,
  createCart,
  addToCart as apiAdd,
  updateCartLine as apiUpdate,
  removeCartLine as apiRemove,
} from "./cartService";

/**
 * GUARANTEE: always returns a valid cart ID
 */
async function resolveCartId(): Promise<string> {
  let id = cartId.get();

  if (!id) {
    const newCart = await createCart();
    if (!newCart?.id) throw new Error("Failed to create cart");
    sync(newCart);
    return newCart.id;
  }

  const existing = await getCart(id);

  if (!existing?.id) {
    const newCart = await createCart();
    if (!newCart?.id) throw new Error("Failed to recreate cart");
    sync(newCart);
    return newCart.id;
  }

  return existing.id;
}

/**
 * 🟢 SAFE GET CART (UI-safe wrapper)
 */
export const getCart = apiGetCart;

/**
 * SINGLE SOURCE OF TRUTH
 */
function sync(cartData: any) {
  if (!cartData?.id) return;

  cart.set({
    id: cartData.id,
    lines: cartData.lines ?? [],
    cost: cartData.cost ?? {},
    checkoutUrl: cartData.checkoutUrl ?? null,
  });

  cartId.set(cartData.id);
}

/**
 * 🟢 PUBLIC API — SAFE ADD
 */
export async function addToCart(variantId: string, quantity = 1) {
  const id = await resolveCartId();

  const res = await apiAdd(id, variantId, quantity);
  if (!res) return null;

  sync(res);
  return res;
}

/**
 * 🟢 SAFE UPDATE
 */
export async function updateCartLine(lineId: string, quantity: number) {
  const id = await resolveCartId();

  const res = await apiUpdate(id, lineId, quantity);
  if (!res) return null;

  sync(res);
  return res;
}

/**
 * 🟢 SAFE REMOVE
 */
export async function removeCartLine(lineId: string) {
  const id = await resolveCartId();

  const res = await apiRemove(id, lineId);
  if (!res) return null;

  sync(res);
  return res;
}

/**
 * 🟢 INIT (call once on app load)
 */
export async function initCart() {
  const id = await resolveCartId();

  const full = await getCart(id);

  if (full?.id) {
    sync(full);
  }
}

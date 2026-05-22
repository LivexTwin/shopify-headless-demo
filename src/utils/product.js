export const isCompletelySoldOut = (variants) =>
  Array.isArray(variants) &&
  variants.length > 0 &&
  variants.every((v) => !v.availableForSale);

export async function buyNow(variantId) {
  const newCart = await createCart();
  if (!newCart) throw new Error("Failed to create cart");

  const updatedCart = await addToCart(newCart.id, variantId, 1);
  if (!updatedCart) throw new Error("Failed to add to cart");

  // Redirect to checkout URL
  window.location.href = updatedCart.checkoutUrl;
}

export function isOnlyOneLeft(variant) {
  return variant?.quantityAvailable === 1 && variant?.availableForSale;
}

export function getMaxLimitError(variant, currentQty, addQty = 1) {
  const limit = variant?.quantityAvailable;

  if (typeof limit !== "number") return null;

  const nextQty = currentQty + addQty;

  if (nextQty > limit) {
    return `Exceeded the maximum quantity available (${limit})`;
  }

  return null;
}

export function getStockMessage(variant) {
  const qty = variant?.quantityAvailable;

  if (typeof qty !== "number") return "";

  if (!variant?.availableForSale) return "";

  if (qty === 1) return "Only 1 left";
  if (qty <= 3) return `Only ${qty} left`;
  if (qty <= 5) return "Low stock";

  return "";
}

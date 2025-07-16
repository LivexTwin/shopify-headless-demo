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

export function canIncrementQuantity(currentQuantity, totalInventory) {
  // If totalInventory is -1 (untracked), allow increment
  if (totalInventory === -1) return true;

  // Otherwise, allow increment only if currentQuantity < totalInventory
  return currentQuantity < totalInventory;
}

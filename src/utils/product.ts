export const isCompletelySoldOut = (variants) =>
  Array.isArray(variants) &&
  variants.length > 0 &&
  variants.every((v) => !v.availableForSale);

export const getFirstAvailableVariant = (variants) =>
  variants?.find((v) => v.availableForSale) || null;

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

export function getSafeVariants(variants: any[] = []) {
  if (!Array.isArray(variants)) return [];
  return variants.filter(Boolean);
}

export function getTotalRemaining(variants: any[] = []) {
  return getSafeVariants(variants).reduce(
    (sum, v) => sum + (v?.quantityAvailable ?? 0),
    0,
  );
}

export function getDropState(variants: any[], dropSize = 18) {
  const safeVariants = getSafeVariants(variants);

  const remaining = safeVariants.reduce(
    (sum, v) => sum + (v?.quantityAvailable ?? 0),
    0,
  );

  const safeRemaining = Math.max(0, remaining);
  const safeDropSize = dropSize;
  // prevents negative or broken math

  const sold = Math.max(0, safeDropSize - safeRemaining);

  const isSoldOut = safeRemaining === 0;

  return {
    remaining: safeRemaining,
    sold,
    total: safeDropSize,
    isSoldOut,
    label: isSoldOut
      ? `SOLD OUT // ${safeDropSize}/${safeDropSize}`
      : `STOCK // ${sold}/${safeDropSize}`,
  };
}

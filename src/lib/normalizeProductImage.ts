export function normalizeProductImage(product: any) {
  const img =
    product?.featuredImage ||
    product?.images?.[0] ||
    product?.images?.nodes?.[0];

  if (!img?.url) return null;

  return {
    url: img.url,
    altText: img.altText || product?.title || "Product",
    width: img.width || 600,
    height: img.height || 600,
  };
}

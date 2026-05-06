export function normalizeProductImages(product: any) {
  const raw =
    product?.images?.nodes ||
    product?.images ||
    product?.images?.edges?.map((e: any) => e.node) ||
    [];

  return raw
    .filter((img: any) => img?.url)
    .map((img: any) => ({
      url: img.url,
      altText: img.altText || product?.title || "Product",
      width: img.width || 800,
      height: img.height || 800,
    }));
}

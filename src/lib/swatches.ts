// lib/swatches.ts
export function getOptionValues(product, optionName) {
  return (
    product.options?.find((o) => o.name === optionName)?.optionValues ?? []
  );
}

<script>
  import VariantSelector from './VariantSelector.svelte';
  import ProductAddToCart from './ProductAddToCart.svelte';
  import SoldOut from './SoldOut.svelte';

  export let product;

  let selectedVariantId = product.variants?.[0]?.id;
  let selectedVariant = product.variants?.[0];

  function handleVariantSelect(variantId) {
    selectedVariantId = variantId;
    selectedVariant = product.variants.find(v => v.id === variantId);
  }
</script>

<h1 class="text-3xl font-bold mb-4">{product.title}</h1>

<SoldOut variants={product.variants} />

<section class="product-purchase space-y-4 mt-4">
  <VariantSelector
    variants={product.variants}
    productId={product.id}
    onSelect={handleVariantSelect}
  />

  <ProductAddToCart
    variants={product.variants}
    variantId={selectedVariantId}
    quantityAvailable={selectedVariant.quantityAvailable}
  />
</section>

<section class="product-description pt-8">
  <h2 class="text-lg font-semibold mb-2">Product Description</h2>
  <div class="text-gray-700 leading-relaxed">
    {@html product.descriptionHtml}
  </div>
</section>

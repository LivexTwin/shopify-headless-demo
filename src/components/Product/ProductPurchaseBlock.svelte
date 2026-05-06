<script>
// ProductPurchaseBlock.svelte
import VariantSelector from "./VariantSelector.svelte";
import ProductAddToCart from "./ProductAddToCart.svelte";
import Money from "../Money.svelte";

  export let product;

  let selectedVariantId = product.variants?.[0]?.id;
  let selectedVariant = product.variants?.[0];

  function handleVariantSelect(variantId) {
    selectedVariantId = variantId;
    selectedVariant = product.variants.find(v => v.id === variantId);
  }
</script>

<div class="space-y-4">

  <h2 class="text-xl font-semibold">{product.title}</h2>

  <Money
    amount={selectedVariant.price.amount}
    currencyCode={selectedVariant.price.currencyCode}
  />

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

</div>
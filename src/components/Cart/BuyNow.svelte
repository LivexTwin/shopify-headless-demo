<script lang="ts">
  import { buyNow } from "@lib/cartActions";
  import {
    isCompletelySoldOut,
    getFirstAvailableVariant
  } from "@utils/product";

  export let product;

  const soldOut = isCompletelySoldOut(product.variants);
  const variant = getFirstAvailableVariant(product.variants);
  const variantId = variant?.id;

  const handleBuy = () => {
    if (!variantId) return;
    buyNow(variantId);
  };
</script>

<button
  disabled={!variantId}
  class="bg-black text-white rounded-[2px] px-4 py-1 disabled:opacity-40"
  on:click={handleBuy}
>
  {soldOut ? "Sold Out" : "Buy"}
</button>
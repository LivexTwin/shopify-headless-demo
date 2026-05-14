<script>
  import { addToCart } from "@lib/cartActions";
  import Spinner from "@components/Spinner.svelte";

  export let variantId = null;
  export let quantityAvailable = 0;
  export let availableForSale = null;

  export let disabled = false;

  let loading = false;

  $: soldOut = variantId ? (availableForSale === false || quantityAvailable <= 0) : false;

  async function handleAddToCart() {
    if (!variantId || soldOut || disabled || loading) return;

    console.log("ADD TO CART:", variantId);

    loading = true;

    try {
      await addToCart(variantId, 1);
    } finally {
      loading = false;
    }
  }
</script>




<!-- 
{#if onlyOneLeft && !soldOut}
  <p class="text-sm text-red-600 mb-2">😱 Only 1 left in stock!</p>
{/if} -->



<button
  on:click={handleAddToCart}
  disabled={!variantId || soldOut || disabled || loading}
  aria-disabled={!variantId || soldOut || disabled || loading}
  aria-live="polite"
  type="button"
  class="bg-neutral-500 min-w-28 rounded-xs text-white py-0.75 text-xs uppercase tracking-wide"
>
  {#if loading}
    <Spinner size={20} />

  {:else if soldOut}
    Sold Out

  {:else}
    + Add to Cart
  {/if}
</button>


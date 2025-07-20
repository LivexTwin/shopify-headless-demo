<script>
  import { isCompletelySoldOut, isOnlyOneLeft } from "@utils/product";
  import { cart, cartId } from "@stores/cart";
  import { createCart, addToCart } from "@lib/cartService";
  import Spinner from "@components/Spinner.svelte";

  export let variants = [];
  export let variantId = null;

  let loading = false;

  // Computed reactivity
  $: soldOut = isCompletelySoldOut(variants);
  $: selectedVariant = variants.find((v) => v.id === variantId);
  $: onlyOneLeft = isOnlyOneLeft(selectedVariant);


  async function handleAddToCart() {
    if (soldOut || loading) return;
    loading = true;

    try {
      let id = $cartId;
      if (!id) {
        const newCart = await createCart();
        if (!newCart) return;
        cartId.set(newCart.id);
        cart.set(newCart);
        id = newCart.id;
      }

      const updatedCart = await addToCart(id, variantId, 1);
      // Simulate a delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 400));
      if (updatedCart) {
        cart.set(updatedCart);
      }
    } finally {
      loading = false;
    }
  }
</script>

{#if onlyOneLeft && !soldOut}
  <p class="text-sm text-red-600 mb-2">😱 Only 1 left in stock!</p>
{/if}

<button
  on:click={handleAddToCart}
  disabled={soldOut || loading}
  aria-disabled={soldOut || loading}
  aria-live="polite"
  aria-label={soldOut ? "Product is sold out" : "Add product to cart"}
  type="button"
  class="w-full min-h-12  px-6 py-3 text-white font-semibold text-center rounded-md transition duration-300
         disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed
         bg-black hover:bg-gray-900 flex items-center justify-center gap-2"
>
  {#if loading}
    <Spinner size={20} />
  {:else if soldOut}
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
        d="M18.364 5.636a9 9 0 11-12.728 12.728 9 9 0 0112.728-12.728zM6.343 6.343l11.314 11.314" />
    </svg>
  {:else}
    Add to Cart
  {/if}
</button>

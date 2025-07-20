<script>
  import { cart } from '@stores/cart.ts';

  $: totalQuantity = $cart?.lines?.reduce((sum, line) => sum + line.quantity, 0) ?? 0;
</script>

<a href="/cart" class="cart-icon relative inline-block" aria-label="View shopping cart">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke-width="1.5" 
    stroke="currentColor" 
    class="w-6 h-6"
    aria-hidden="true"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>

  {#if totalQuantity > 0}
       <span
      class="absolute top-0 right-0 inline-flex items-center justify-center
             px-1.5 py-0.5 text-xs font-bold leading-none text-white
             bg-blue-600 rounded-full
             translate-x-1/2 -translate-y-1/2"
      aria-live="polite"
    >
      {totalQuantity}
    </span>
    <span class="sr-only">{totalQuantity} items in cart</span>
  {:else}
    <span class="sr-only">Cart is empty</span>
  {/if}
</a>

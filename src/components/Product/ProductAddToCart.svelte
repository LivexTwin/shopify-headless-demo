<script>
  export let loading = false;
  export let disabled = false;
  export let soldOut = false;
  export let canAddToCart = false;

  
</script>

<button
  on:click
  disabled={loading || disabled || soldOut}
  type="button"
  class="
  min-w-28 rounded-[2px] py-0.75 text-xs uppercase tracking-wide   transition-opacity duration-800 ease-out
  md:hover:opacity-50
 
  {canAddToCart
    ? 'bg-black text-white '
    : 'bg-neutral-500 text-white'}
 "
>
{#if loading}
 <p class="text-xs uppercase tracking-wider animate-pulse">
  waiting
 </p>
  {:else if soldOut}
    Sold Out
  {:else}
    + Add to Cart
  {/if}
</button>


<!-- components/SoldOut.svelte -->
<script>
  import { isCompletelySoldOut } from '@utils/product.js';
  export let variants = [];

  $: soldOut = isCompletelySoldOut(variants);
</script>

{#if soldOut}
    <span class="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full select-none">
      Sold Out
    </span>
{/if}

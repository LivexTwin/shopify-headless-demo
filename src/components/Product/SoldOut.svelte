<!-- components/SoldOut.svelte -->
<script>
import { isCompletelySoldOut } from '@utils/product.js';
  export let variants = [];

  $: soldOut = isCompletelySoldOut(variants);
</script>

{#if soldOut}
  <span class="badge sold-out">Sold Out</span>
  
{/if}

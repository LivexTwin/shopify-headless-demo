<script>
import { cart } from '@stores/cart.ts';

  $: totalQuantity = $cart?.lines?.reduce((sum, line) => sum + line.quantity, 0) ?? 0;
</script>

<a href="/cart" class="cart-icon" aria-label="View shopping cart">
  🛒
  {#if totalQuantity > 0}
    <span class="cart-count" aria-live="polite">{totalQuantity}</span>
    <span class="sr-only">{totalQuantity} items in cart</span>
  {:else}
    <span class="sr-only">Cart is empty</span>
  {/if}
</a>

<script>
  import { cart } from "@stores/cart";
  import { cartToast } from "@stores/cartToast";

  $: totalQuantity =
    $cart?.lines?.reduce((sum, line) => sum + line.quantity, 0) ?? 0;

  function toggleCart() {
    cartToast.set({
      open: !$cartToast.open
    });
  }
  
</script>

<button
  on:click={toggleCart}
  class="inline-flex items-baseline gap-2 text-white px-2 py-1 rounded-[2px] text-xs uppercase tracking-wider bg-gray-100 md:hover:opacity-50"
  aria-label="Open cart"
>
  <span>CART</span>

  <span class="font-inherit text-inherit">
    {totalQuantity}
  </span>
</button>
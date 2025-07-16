<!-- src/components/Cart/CartView.svelte -->
<script>
  import { onMount } from 'svelte';
  import { cart } from '@stores/cart.ts';
  import { getCart, updateCartLine, removeCartLine } from '@lib/cartService.ts';
  import CartContents from './CartContents.svelte';

onMount(async () => {
  if ($cart?.id) {
    const updated = await getCart($cart.id);
    if (updated) {
      cart.set(updated);
    }
  }
});

async function updateQuantity(lineId, quantity) {
  if (quantity < 1) return await removeLine(lineId);
  const updated = await updateCartLine($cart.id, lineId, quantity);
  if (updated) {
    const full = await getCart($cart.id);
    if (full) cart.set(full);
  }
}

async function removeLine(lineId) {
  const updated = await removeCartLine($cart.id, lineId);
  if (updated) {
    const full = await getCart($cart.id);
    if (full) cart.set(full);
  }
}

</script>


{#if $cart?.lines?.length > 0}
  <CartContents
    cart={$cart}
    onUpdateQuantity={updateQuantity}
    onRemoveLine={removeLine}
  />

  <p><strong>Subtotal:</strong> ${$cart.cost?.subtotalAmount?.amount ?? '0.00'}</p>

  {#if $cart?.checkoutUrl}
    <button on:click={() => window.location.href = $cart.checkoutUrl}>
      Proceed to Checkout
    </button>
  {:else}
    <p>No checkout available</p>
  {/if}
{:else}
  <p>Your cart is empty.</p>
{/if}
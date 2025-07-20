<!-- src/components/Cart/CartView.svelte -->
<script>
  import { onMount } from 'svelte';
  import { cart } from '@stores/cart.ts';
  import { getCart, updateCartLine, removeCartLine, } from '@lib/cartService.ts';
  import CartContents from './CartContents.svelte';
  import Spinner from '@components/Spinner.svelte';

  let loading = false;

  
  
  onMount(async () => {
    if ($cart?.id) {
      const updated = await getCart($cart.id);
      if (updated) {
        cart.set(updated);
      }
    }
  });

  async function updateQuantity(lineId, quantity) {
    loading = true;
    if (quantity < 1) {
      await removeLine(lineId);
      loading = false;
      return;
    }
    const updated = await updateCartLine($cart.id, lineId, quantity);
    if (updated) {
      const full = await getCart($cart.id);
      if (full) cart.set(full);
    }
    loading = false;
  }

  async function removeLine(lineId) {
    const updated = await removeCartLine($cart.id, lineId);
    if (updated) {
      const full = await getCart($cart.id);
      if (full) cart.set(full);
    }
  }


  
</script>

<div class="max-w-4xl mx-auto p-4">
  {#if $cart?.lines?.length > 0}
    <CartContents
      cart={$cart}
      onUpdateQuantity={updateQuantity}
      onRemoveLine={removeLine}
    />
    <p class="mt-6 text-lg flex items-center gap-2">
      <span>Subtotal: </span>
      {#if loading}
      <Spinner size={20} />
      {:else}
        <span class="font-bold">${$cart.cost?.subtotalAmount?.amount ?? '0.00'}</span>
      {/if}
    </p>


    
    {#if $cart?.checkoutUrl}
      <button
        class="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        on:click={() => window.location.href = $cart.checkoutUrl}
      >
        Proceed to Checkout
      </button>
    {:else}
      <p>No checkout available</p>
    {/if}
  {:else}
    <div class="text-center py-10">
      <p class="mb-4">Your cart is empty.</p>
      <a
        href="/"
        class="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Continue Shopping
      </a>
    </div>
  {/if}
</div>

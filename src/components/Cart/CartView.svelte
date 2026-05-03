<script>
  import { updateCartLine, removeCartLine, getCart } from '@lib/cartActions.ts';
  import { cart } from '@stores/cart.ts';

  import CartContents from './CartContents.svelte';
  import Spinner from '@components/Spinner.svelte';

  let loading = false;



  async function updateQuantity(lineId, quantity) {
    loading = true;

    try {
      if (quantity < 1) {
        await removeCartLine(lineId);
      } else {
        await updateCartLine(lineId, quantity);
      }
    } finally {
      loading = false;
    }
  }

  async function removeLine(lineId) {
    loading = true;
    await removeCartLine(lineId);
    loading = false;
  }


    async function goToCheckout() {
    const current = $cart;
    if (!current?.id) {
      console.error("No cart available");
      return;
    }

    const fresh = await getCart(current.id);


    if (!fresh?.checkoutUrl) {
      console.error("Checkout URL missing");
      return;
    }

    window.location.href = fresh.checkoutUrl;
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


{#if $cart?.id}
  <button
    class="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
    on:click={goToCheckout}
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

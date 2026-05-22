<script>
  import { cart } from "@stores/cart";
  import { cartToast } from "@stores/cartToast";
  import Money from "@components/Money.svelte";


  import {  getCart } from "@lib/cartActions";
  import CartRow from "./CartRow.svelte";

  $: toast = $cartToast;
  $: currentCart = $cart;

  let isClosing = false;

  async function goToCheckout() {
    const fresh = await getCart($cart.id);

    if (fresh?.checkoutUrl) {
      window.location.href = fresh.checkoutUrl;
    }
  }

  function close() {
    isClosing = true;
    setTimeout(() => {
      toast.open = false;
      isClosing = false;
    }, 200);
  }

  function handleKeydown(e) {
    if (e.key === "Escape") close();
  }

  $: if (toast.open && typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeydown);
  }

  $: if (!toast.open && typeof window !== "undefined") {
    window.removeEventListener("keydown", handleKeydown);
  }
</script>

{#if toast.open}

 <button
  type="button"
  class="fixed inset-0 z-51 bg-neutral-600/50 cursor-pointer backdrop {isClosing ? 'backdrop-out' : ''}"
  on:click={close}
  aria-label="Close cart"
  > 
  </button>


  <div 
    class="fixed bottom-6 px-2  z-51 w-full md:min-w-[280px] md:right-6 rounded-[2px] text-white opacity-fade"
    style="opacity: {isClosing ? 0 : 1}"
  >

    {#if $cart?.lines?.length > 0}

      <div>
        {#each $cart.lines as line (line.id)}
          <CartRow
            {line}
          />
        {/each}
      </div>

      <div class="flex justify-between mb-[.125rem] rounded-[2px] bg-gray-100 py-1 text-sm  px-2">
        <span class="tracking-wider">TOTAL :</span>
        <span >
          <Money
           amount={$cart.cost?.subtotalAmount?.amount ?? "0.00"}
           currencyCode={$cart.cost?.subtotalAmount?.currencyCode ?? "USD"}
           />
        </span>
      </div>

  <button
    class="bg-black text-white flex justify-between items-center rounded-[2px] px-2 w-full transition-colors duration-200 hover:bg-white hover:text-black "
    on:click={goToCheckout}
   >
  <span class="text-sm uppercase py-2">
    Checkout
  </span>

  <span>
    →
  </span>
</button>

    {:else}

      <div class="py-10 text-center text-sm opacity-60 uppercase tracking-wider">
        Cart empty
      </div>

    {/if}

  </div>

{/if}


<style>
.backdrop {
  animation: backdrop-in 180ms ease-in-out forwards;
}

.backdrop-out {
  animation: backdrop-out 200ms ease-in-out forwards;
}

.opacity-fade {
  transition: opacity 100ms ease-out;
}

@keyframes backdrop-in {
  from {
    background-color: rgba(64, 64, 64, 0);
    backdrop-filter: blur(0px);
  }

  to {
    background-color: rgba(64, 64, 64, 0.5);
    backdrop-filter: blur(12px);
  }
}

@keyframes backdrop-out {
  from {
    background-color: rgba(64, 64, 64, 0.5);
    backdrop-filter: blur(12px);
  }

  to {
    background-color: rgba(64, 64, 64, 0);
    backdrop-filter: blur(0px);
  }
}
</style>
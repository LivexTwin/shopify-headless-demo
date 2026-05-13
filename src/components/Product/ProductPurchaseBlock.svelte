<script>
  import ProductAddToCart from "./ProductAddToCart.svelte";
  import Money from "../Money.svelte";
  import QuickAdd from "@lib/components/QuickAdd.svelte";
  import DetailSelector from "@lib/components/DetailSelector.svelte";

  export let product;
  export let mode = "quick"; // "quick" | "detail"

  let selectedVariant = null;
  

  function handleSelect(variant) {
  
  selectedVariant = variant;
  }

  // 🟡 Always show something in UI (fallback display)
  $: displayVariant =
    selectedVariant ??
    product.variants?.find(v => v.availableForSale) ??
    product.variants?.[0];

  // 🟢 Cart is enabled ONLY when a real variant exists
  $: canAddToCart = !!selectedVariant?.id;
</script>


{#if mode === "quick"}

  <div class="space-y-4">

    {#if displayVariant?.price}
      <Money
        amount={displayVariant.price.amount}
        currencyCode={displayVariant.price.currencyCode}
      />
    {/if}

    <QuickAdd
      {product}
      onSelect={handleSelect}
    />

    <ProductAddToCart
      disabled={!canAddToCart}
      variantId={selectedVariant?.id}
      quantityAvailable={selectedVariant?.quantityAvailable || 0}
    />

  </div>

{:else}

  <div class="space-y-6">

    {#if displayVariant?.price}
      <Money
        amount={displayVariant.price.amount}
        currencyCode={displayVariant.price.currencyCode}
      />
    {/if}

    <!-- DETAIL LAYOUT -->
    <div class="flex flex-wrap items-center gap-1 pt-3.5">

      <DetailSelector
        {product}
        onSelect={handleSelect}
      />

      <ProductAddToCart
        disabled={!canAddToCart}
        variantId={selectedVariant?.id}
        quantityAvailable={selectedVariant?.quantityAvailable || 0}
      />

    </div>

  </div>

{/if}
<script>
  import { onMount } from "svelte";

  import Money from "../Money.svelte";
  import QuickAdd from "@lib/components/QuickAdd.svelte";
  import DetailSelector from "@lib/components/DetailSelector.svelte";
  import ProductAddToCart from "./ProductAddToCart.svelte";

  import { createShopifyVariantResolver } from "@lib/variants/useShopifyVariant";
  import {
    parseOptionsFromUrl,
    syncOptionsToUrl,
  } from "@lib/variants/variantUrl";

  // -----------------------------
  // Props
  // -----------------------------
  export let product;
  export let mode = "quick";

  // -----------------------------
  // State
  // -----------------------------
  let resolver = null;

  let selectedOptions = {};
  let selectedVariant = null;
  let canAddToCart = false;

  let initialized = false;
  let lastProductId = null;
  let lastUrlSignature = "";

  // -----------------------------
  // Lifecycle
  // -----------------------------
  onMount(() => {
    if (!product) return;

    // prevent accidental re-init per product
    if (product.id === lastProductId) return;
    lastProductId = product.id;

    const initialOptions = parseOptionsFromUrl(
      window.location.search || ""
    );

    resolver = createShopifyVariantResolver(
      product,
      mode,
      initialOptions
    );

    refreshSelection();
    initialized = true;
  });

  // -----------------------------
  // State sync
  // -----------------------------
  function refreshSelection() {
    if (!resolver) return;

    selectedOptions = resolver.getSelectedOptions();
    selectedVariant = resolver.getSelectedVariant();
    canAddToCart = resolver.isVariantValidForCart();
  }

  // -----------------------------
  // Actions
  // -----------------------------
  function updateOption(name, value) {
    if (!resolver) return;

    resolver.updateOption(name, value);
    refreshSelection();

    const options = resolver.getSelectedOptions();
    const signature = JSON.stringify(options);

    if (signature === lastUrlSignature) return;

    lastUrlSignature = signature;
    syncOptionsToUrl(options);
  }
</script>

{#if resolver}
  {#if mode === "quick"}
    <div class="space-y-4">
      {#if selectedVariant?.price}
        <Money
          amount={selectedVariant.price.amount}
          currencyCode={selectedVariant.price.currencyCode}
        />
      {/if}

      <QuickAdd
        {product}
        selectedOptions={selectedOptions}
        selectedVariant={selectedVariant}
        updateOption={updateOption}
        getAvailableOptions={resolver.getAvailableOptions}
        hasAvailableOption={resolver.hasAvailableOption}
      />

      <ProductAddToCart
        disabled={!canAddToCart}
        variantId={selectedVariant?.id}
        quantityAvailable={selectedVariant?.quantityAvailable || 0}
        availableForSale={selectedVariant?.availableForSale ?? true}
      />
    </div>
  {:else}
    <div class="space-y-6">
      {#if selectedVariant?.price}
        <Money
          amount={selectedVariant.price.amount}
          currencyCode={selectedVariant.price.currencyCode}
        />
      {:else}
        {#if product.variants?.[0]?.price}
          <Money
            amount={product.variants[0].price.amount}
            currencyCode={product.variants[0].price.currencyCode}
          />
        {/if}
      {/if}

      <div class="flex flex-wrap items-center gap-1 pt-3.5">
        <DetailSelector
          {product}
          selectedOptions={selectedOptions}
          selectedVariant={selectedVariant}
          updateOption={updateOption}
          getAvailableOptions={resolver.getAvailableOptions}
          hasAvailableOption={resolver.hasAvailableOption}
        />

        <ProductAddToCart
          disabled={!canAddToCart}
          variantId={selectedVariant?.id}
          quantityAvailable={selectedVariant?.quantityAvailable || 0}
          availableForSale={selectedVariant?.availableForSale ?? true}
        />
      </div>
    </div>
  {/if}
{/if}
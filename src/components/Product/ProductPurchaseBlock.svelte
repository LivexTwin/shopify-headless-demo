<script>
  import { onMount } from "svelte";

  import Money from "../Money.svelte";
  import QuickAdd from "@lib/components/QuickAdd.svelte";
  import DetailSelector from "@lib/components/DetailSelector.svelte";
  import ProductAddToCart from "./ProductAddToCart.svelte";

  import { cartToast } from "@stores/cartToast";
  import { cart } from "@stores/cart";

  import { createShopifyVariantResolver } from "@lib/variants/useShopifyVariant";

  import { addToCart } from "@lib/cartActions";

  import {
    getMaxLimitError,
    getStockMessage,
  } from "@utils/product";

  import {
    parseOptionsFromUrl,
    syncOptionsToUrl,
  } from "@lib/variants/variantUrl";

  export let product;
  export let mode = "quick";

  let resolver ;

  let loading = false;
  let error = "";
  let infoMessage = "";

  let selectedOptions = {};
  let selectedVariant = null;
  let canAddToCart = false;

  let initialized = false;
  let userInteracted = false;

  let lastProductId = null;
  let lastUrlSignature = "";

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
  // Create resolver immediately
  // -----------------------------
  if (product) {
    resolver = createShopifyVariantResolver(
      product,
      mode,
      {}
    );

    refreshSelection();
  }

  // -----------------------------
  // URL hydration only
  // -----------------------------
  onMount(() => {
    if (!resolver) return;

    const initialOptions = parseOptionsFromUrl(
      window.location.search || ""
    );

    Object.entries(initialOptions).forEach(([name, value]) => {
      resolver.updateOption(name, value);
    });

    refreshSelection();

    initialized = true;
    lastProductId = product?.id;
  });

  function updateOption(name, value, source = "user") {
    if (source === "user") {
      userInteracted = true;
    }

    resolver.updateOption(name, value);

    refreshSelection();

    if (canAddToCart && error) {
      error = "";
    }

    const options = resolver.getSelectedOptions();
    const signature = JSON.stringify(options);

    if (signature === lastUrlSignature) return;

    lastUrlSignature = signature;

    syncOptionsToUrl(options);
  }

  function getAvailableOptions(name) {
    return resolver?.getAvailableOptions(name) ?? [];
  }

  function hasAvailableOption(name, value) {
    return (
      resolver?.hasAvailableOption(name, value) ?? false
    );
  }

  $: currentQty =
    $cart?.lines?.find(
      (l) => l.merchandise?.id === selectedVariant?.id
    )?.quantity ?? 0;

  $: infoMessage =
    userInteracted && selectedVariant?.id
      ? getStockMessage(selectedVariant)
      : "";

  $: displayVariant =
    selectedVariant ??
    product.selectedOrFirstAvailableVariant ??
    product.variants?.[0];

  async function handleAddToCart() {
    error = "";

    if (!selectedVariant?.id) {
      error = "Please select a variant";
      return;
    }

    const limitError = getMaxLimitError(
      selectedVariant,
      currentQty
    );

    if (limitError) {
      error = limitError;
      return;
    }

    loading = true;

    try {
      await addToCart(selectedVariant.id, 1);

      const latestLine = $cart?.lines?.find(
        (l) =>
          l.merchandise?.id === selectedVariant.id
      );

      cartToast.set({
        open: true,
        line: latestLine ?? null,
      });
    } finally {
      loading = false;
    }
  }
</script>



  {#if mode === "quick"}
    <div class="space-y-4">

     <Money
          amount={displayVariant.price.amount}
          currencyCode={displayVariant.price.currencyCode}
          />
    

      <QuickAdd
        {product}
        selectedOptions={selectedOptions}
        selectedVariant={selectedVariant}
        updateOption={updateOption}
        getAvailableOptions={getAvailableOptions}
        hasAvailableOption={hasAvailableOption}
      />

      <ProductAddToCart
        disabled={!canAddToCart}
        canAddToCart={canAddToCart}
        error={error}
        loading={loading}
        soldOut={selectedVariant?.availableForSale === false}
        on:click={handleAddToCart}
        variantId={selectedVariant?.id}
        quantityAvailable={selectedVariant?.quantityAvailable || 0}
        availableForSale={selectedVariant?.availableForSale ?? true}
      />
    </div>
  {:else}
    <div class="space-y-6">

     <Money
          amount={displayVariant.price.amount}
          currencyCode={displayVariant.price.currencyCode}
          />

      <div class="flex flex-wrap gap-1 pt-3.5">
        <DetailSelector
          {product}
          selectedOptions={selectedOptions}
          selectedVariant={selectedVariant}
          updateOption={updateOption}
          getAvailableOptions={getAvailableOptions}
          hasAvailableOption={hasAvailableOption}
        />

        <ProductAddToCart
          canAddToCart={canAddToCart}
          error={error}
          loading={loading}
          soldOut={selectedVariant?.availableForSale === false}
          disabled={false}
          on:click={handleAddToCart}
          onValidationError={() => {
          error = "Please select a variant";
           }}
          variantId={selectedVariant?.id}
          quantityAvailable={selectedVariant?.quantityAvailable || 0}
          availableForSale={selectedVariant?.availableForSale ?? true}
        />
      </div>

  
    </div>
  {/if}


{#if error}
  <p class="text-[11px] uppercase tracking-wide text-red-600 mt-2">
    {error}
  </p>
{:else if infoMessage}
  <p class="text-[11px] uppercase tracking-wide text-neutral-500 mt-2">
    {infoMessage}
  </p>
{/if}
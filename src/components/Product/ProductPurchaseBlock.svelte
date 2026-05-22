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
  import { getMaxLimitError, getStockMessage } from "@utils/product";
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
  function updateOption(name, value, source = "user") {
  if (source === "user") userInteracted = true;

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

  
    // -----------------------------
  // Handlers
  // -----------------------------
  $: currentQty =
  $cart?.lines?.find(
    (l) => l.merchandise?.id === selectedVariant?.id
  )?.quantity ?? 0;

$: infoMessage =
  userInteracted && selectedVariant?.id
    ? getStockMessage(selectedVariant)
    : "";
  
  async function handleAddToCart() {
  error = "";

  if (!selectedVariant?.id) {
    error = "Please select a variant";
    return;
  }

  const limitError = getMaxLimitError(selectedVariant, currentQty);

  if (limitError) {
    error = limitError;
    return;
  }

  loading = true;

  try {
    await addToCart(selectedVariant.id, 1);

    const latestLine = $cart?.lines?.find(
      (l) => l.merchandise?.id === selectedVariant.id
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

      <div class="flex flex-wrap gap-1 pt-3.5">
        <DetailSelector
          {product}
          selectedOptions={selectedOptions}
          selectedVariant={selectedVariant}
          updateOption={updateOption}
          getAvailableOptions={resolver.getAvailableOptions}
          hasAvailableOption={resolver.hasAvailableOption}
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
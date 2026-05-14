<script>
  import ProductAddToCart from "./ProductAddToCart.svelte";
  import Money from "../Money.svelte";
  import QuickAdd from "@lib/components/QuickAdd.svelte";
  import DetailSelector from "@lib/components/DetailSelector.svelte";
  import { createShopifyVariantResolver } from "@lib/variants/useShopifyVariant";

  export let product;
  export let mode = "quick";

  let resolver = null;
  let selectedOptions = {};
  let selectedVariant = null;
  let canAddToCart = false;

  $: if (product) {
    resolver = createShopifyVariantResolver(product, mode);
    refreshSelection();
  }

  function refreshSelection() {
    if (!resolver) return;
    selectedOptions = resolver.getSelectedOptions();
    selectedVariant = resolver.getSelectedVariant();
    canAddToCart = resolver.isVariantValidForCart();
    console.log("product purchase state", {
      selectedOptions,
      selectedVariant,
      canAddToCart,
    });
  }

  function updateOption(name, value) {
    if (!resolver) return;
    resolver.updateOption(name, value);
    refreshSelection();
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
        hasAvailableOption={(name, value) =>
            resolver.getAvailableOptions(name).includes(value)
          }
        onSelect={(v) => console.log("quick variant", v)}
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
          updateOption={updateOption}
          getAvailableOptions={resolver.getAvailableOptions}
          hasAvailableOption={(name, value) =>
            resolver.getAvailableOptions(name).includes(value)
          }
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
<script>
  import { onMount } from 'svelte';
  import { createVariantSelector } from "@utils/useVariantSelector";
  import Money from '../Money.svelte';


  export let variants = [];
  export let onSelect;
  export let productId;

  let selector;
  let optionNames = [];
  let selectedOptions = {};
  let selectedVariant;
  let selectedVariantId;

onMount(() => {
  const url = new URL(window.location.href);
  const variantIdFromUrl = url.searchParams.get('variant');

  let savedOptions = null;

  if (variantIdFromUrl) {
    const variant = variants.find(v => v.id === variantIdFromUrl);
    if (variant) {
      savedOptions = variant.selectedOptions.reduce((acc, o) => {
        acc[o.name] = o.value;
        return acc;
      }, {});
    }
  }

  selector = createVariantSelector(variants, savedOptions);
  optionNames = selector.optionNames;
  selectedOptions = selector.selectedOptions;

  selectedVariant = selector.findMatchingVariant();
  selectedVariantId = selectedVariant?.id;

  if (typeof onSelect === 'function') {
    onSelect(selectedVariantId);
  }
});


function handleOptionChange(optionName, event) {
  const result = selector.updateOption(optionName, event.target.value);
  selectedOptions = result.selectedOptions;
  selectedVariant = result.selectedVariant;
  selectedVariantId = selectedVariant?.id;

  if (selectedVariantId && typeof onSelect === 'function') {
    onSelect(selectedVariantId);
    updateUrlWithVariant(selectedVariantId); // 👈 Only when user acts
  }


  localStorage.setItem(`selectedOptions:${productId}`, JSON.stringify(selectedOptions));
}

export function updateUrlWithVariant(variantId) {
  const url = new URL(window.location.href);
  if (variantId) {
    url.searchParams.set('variant', variantId);
  } else {
    url.searchParams.delete('variant');
  }
  window.history.replaceState({}, '', url);
}
</script>

<fieldset class="space-y-6">
  <legend class="sr-only">Select product options</legend>

  {#each optionNames as optionName}
    <div class="flex flex-col gap-1">
      <label
        for={optionName}
        class="text-sm font-medium text-gray-800"
      >
        {optionName}
      </label>

      {#key selectedOptions[optionName]}
        <select
          id={optionName}
          bind:value={selectedOptions[optionName]}
          on:change={(e) => handleOptionChange(optionName, e)}
          aria-describedby={`${optionName}-desc`}
          class="rounded-lg border border-gray-300 focus:ring focus:ring-black/10 focus:outline-none p-3 bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#each Array.from(new Set(
            variants.map(v =>
              v.selectedOptions.find(o => o.name === optionName)?.value
            ).filter(Boolean)
          )) as optionValue}
            <option
              value={optionValue}
              disabled={!selector.hasAvailableVariant(optionName, optionValue)}
            >
              {optionValue}
              {!selector.hasAvailableVariant(optionName, optionValue) ? ' (Sold Out)' : ''}
            </option>
          {/each}
        </select>

        <span id={`${optionName}-desc`} class="sr-only">
          {!selector.hasAvailableVariant(optionName, selectedOptions[optionName])
            ? 'Sold Out'
            : 'Available'}
        </span>
      {/key}
    </div>
  {/each}
</fieldset>

  <div class="text-lg font-semibold text-gray-900 pt-4 mb-4">
  <Money amount={selectedVariant?.price?.amount} currencyCode={selectedVariant?.price?.currencyCode} />
  </div>

<script>
  import { syncOptionsToUrl } from "@lib/variants/useVariantUrlSync";
  import { getInitialOptions } from "@lib/variants/getInitialOptions";
  import { createVariantSelector } from "@lib/variants/useVariantSelector";
  import { onMount } from "svelte";

  export let variants = [];
  export let onSelect;

  const {
    selectedOptions,
    selectedVariant,
    optionNames,
    updateOption,
    hasAvailableVariant,
    getOptionValues
  } = createVariantSelector(
    variants,
    getInitialOptions(variants)
  );

  onMount(() => {
  if ($selectedVariant?.id) {
    onSelect?.($selectedVariant);
  }
});

function handleOptionChange(optionName, value) {
  updateOption(optionName, value);

  const variant = $selectedVariant;

  syncOptionsToUrl($selectedOptions);

  onSelect?.(variant ?? null);
}

  $: console.log("selectedOptions", $selectedOptions);
$: console.log("selectedVariant", $selectedVariant);
</script>

<fieldset class="mt-6 space-y-6">

{#each optionNames as optionName}
    <div class="flex flex-col gap-2">

      <label class="text-xs uppercase">
        {optionName}
      </label>

      <div class="flex flex-wrap gap-2">

        {#each getOptionValues(optionName) as optionValue}

          <button
            type="button"
            on:click={() =>
              handleOptionChange(optionName, optionValue)
            }
            disabled={!hasAvailableVariant(optionName, optionValue)}
            class="px-3 py-2 text-xs uppercase border"
            class:bg-black={$selectedOptions[optionName] === optionValue}
            class:text-white={$selectedOptions[optionName] === optionValue}
            class:opacity-40={!hasAvailableVariant(optionName, optionValue)}
          >
            {optionValue}
          </button>

        {/each}

      </div>

    </div>

  {/each}

</fieldset>
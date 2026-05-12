<script>
  import { createVariantSelector } from "@lib/variants/useVariantSelector";
  import { resolveInitialOptions } from "@lib/variants/resolveInitialOptions";
  import { readOptionsFromUrl } from "@lib/variants/useVariantUrlSync";

  export let product;
  export let onSelect;

  const variants = product?.variants ?? [];

  

  const initialOptions = resolveInitialOptions(
  variants,
  readOptionsFromUrl(),
  "quick"
  );

  const {
    selectedOptions,
    selectedVariant,
    updateOption,
    getOptionValues,
    hasAvailableVariant,

  } = createVariantSelector(
    variants,
    initialOptions,
    true
  );



  $: onSelect?.($selectedVariant ?? null);
</script>

<div class="flex gap-2 flex-wrap">
  {#each getOptionValues("Size") as size}
    <button
      type="button"
      on:click={() => updateOption("Size", size)}
      disabled={!hasAvailableVariant("Size", size)}
      class:bg-black={$selectedOptions.Size === size}
      class:text-white={$selectedOptions.Size === size}
      class:opacity-40={!hasAvailableVariant("Size", size)}
    >
      {size}
    </button>

    
  {/each}

  
</div>


<div class="flex gap-2 flex-wrap">
  {#each getOptionValues("Color") as color}
<button
  type="button"
  on:click={() => updateOption("Color", color)}
  class="w-6 h-6 rounded-full border"
  class:opacity-40={!hasAvailableVariant("Color", color)}
  aria-label={color}
>
  <span class="sr-only">{color}</span>
      </button>
  {/each}
</div>

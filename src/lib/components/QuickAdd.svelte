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



<div class=" flex flex-col pt-2">
  <span class="text-xs font-medium text-gray-400 uppercase tracking-widest">Size</span>
  <div class="flex gap-1.5">
      {#each getOptionValues("Size") as size}
        <button
    
          type="button"
          on:click={() => updateOption("Size", size)}
          disabled={!hasAvailableVariant("Size", size)}
          class:underline={$selectedOptions.Size === size}
          class:opacity-40={!hasAvailableVariant("Size", size)}
          class=" text-xs hover:underline"
        >
          {size}
        </button>
      
      {/each}
  </div>

</div>


<div class="flex gap-2 flex-wrap">
  {#each getOptionValues("Color") as color}
<button
  type="button"
  on:click={() => updateOption("Color", color)}
  class="w-3 h-3 rounded-xs border"
  class:opacity-40={!hasAvailableVariant("Color", color)}
  aria-label={color}
>
  <span class="sr-only">{color}</span>
      </button>
  {/each}
</div>

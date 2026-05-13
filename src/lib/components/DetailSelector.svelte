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
  "detail"
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


<section>
<div class="relative w-fit">

  <!-- VISIBLE UI -->
  <div
    class="
      flex items-center justify-between
      bg-stone-300 px-2 py-0.75
      text-xs uppercase tracking-widest
      cursor-pointer
      min-w-[60px]
    "
  >
    <span>
      {$selectedOptions.Size || "Size +"}
    </span>
  </div>

  <!-- REAL SELECT -->
  <select
    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    bind:value={$selectedOptions.Size}
    on:change={(e) => updateOption("Size", e.target.value)}
  >
    <option value="" disabled>
      -
    </option>

    {#each getOptionValues("Size") as size}
      <option
        value={size}
        disabled={!hasAvailableVariant("Size", size)}
      >
        {size}
      </option>
    {/each}
  </select>
  
</div>
</section>
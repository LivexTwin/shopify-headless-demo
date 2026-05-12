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

  } = createVariantSelector(
    variants,
    initialOptions,
    true
  );

  $: onSelect?.($selectedVariant ?? null);
</script>


<section class="space-y-6">

  <div>
    <p>Select Size</p>

    <div class="flex gap-2">
      {#each getOptionValues("Size") as size}

        <button
          type="button"
          on:click={() => updateOption("Size", size)}
        >
          {size}
        </button>

      {/each}
    </div>
  </div>

</section>
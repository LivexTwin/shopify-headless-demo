<script>
  import ColorSwatch from "@lib/components/ColorSwatch.svelte";

  export let product;
  export let selectedOptions = {};
  export let selectedVariant = null;
  export let updateOption;
  export let getAvailableOptions;
  export let hasAvailableOption;
  export let onSelect;

  const colors = product.options
    ?.find((o) => o.name === "Color")
    ?.optionValues ?? [];

  $: sizeOptions = getAvailableOptions && selectedOptions
    ? getAvailableOptions("Size")
    : [];

  $: onSelect?.(selectedVariant);

  function selectSize(size) {
    updateOption?.("Size", size);
  }

  function selectColor(color) {
    updateOption?.("Color", color);
  }
</script>



<div class=" flex flex-col pt-2">
  <span class="text-xs  text-gray-400 uppercase tracking-wide pb-2">Size</span>
  <div class="flex gap-1.5">
    {#each sizeOptions as size}
      <button
        type="button"
        on:click={() => selectSize(size)}
        disabled={!hasAvailableOption("Size", size)}
        class:underline={selectedOptions.Size === size}
        class:opacity-40={!hasAvailableOption("Size", size)}
        class=" text-xs hover:underline"
      >
        {size}
      </button>
    {/each}
  </div>

  <span class="text-xs  text-gray-400 uppercase tracking-wide pb-2">Color</span>

  <ColorSwatch
    colors={colors}
    selected={selectedOptions.Color}
    onSelect={selectColor}
    hasAvailableOption={(name, value) =>
      getAvailableOptions?.(name)?.includes(value)
    }
  />
</div>



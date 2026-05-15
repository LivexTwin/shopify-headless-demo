<script>
  import ColorSwatch from "@lib/components/ColorSwatch.svelte";
  import { getOptionValues } from "@lib/swatches";

  export let product;
  export let selectedOptions = {};
  export let updateOption;
  export let getAvailableOptions;
  export let hasAvailableOption;

 
  const colors = getOptionValues(product, "Color");

  $: sizeOptions = getAvailableOptions && selectedOptions
    ? getAvailableOptions("Size")
    : [];
</script>

<section class="flex items-center gap-2">
  <div class="relative w-fit">
    <div class="flex items-center justify-between bg-stone-300 px-2 py-0.75 text-xs uppercase tracking-widest min-w-[60px]">
      <span>{selectedOptions.Size || "Size +"}</span>
    </div>

    <select
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"

       bind:value={selectedOptions.Size}
       on:change={(e) => updateOption("Size", e.target.value)}
    >
       <option value="" disabled selected={!selectedOptions.Size}>
       -
       </option>

      {#each sizeOptions as size}
      <option
       value={size}
       disabled={!hasAvailableOption("Size", size)}
         >
       {size}

      </option>
        {/each}


    </select>
  </div>

  <ColorSwatch
    colors={colors}
    selected={selectedOptions.Color}
    onSelect={(c) => updateOption("Color", c)}
    hasAvailableOption={hasAvailableOption}
    size="lg"
  />
</section>
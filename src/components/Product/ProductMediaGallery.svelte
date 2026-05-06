<script>
import ShopifyImage from "@components/ShopifyImage.svelte";

  export let images = [];
  export let altBase = "";
  export let variant = "compact"; // "compact" | "editorial"

  let index = 0;

  function next() {
    if (index < images.length - 1) index += 1;
  }

  function prev() {
    if (index > 0) index -= 1;
  }

  $: active = images?.[index];


</script>

{#if variant === "compact"}
  <div class="relative aspect-square w-full overflow-hidden">

    <ShopifyImage
      image={active ? {
        url: active.url,
        altText: active.altText || altBase,
        width: 800,
        height: 800
      } : null}
      classList="absolute inset-0 w-full h-full object-cover"
    />

    <p class="text-xs">{images?.length}</p>

    <!-- minimal controls -->
    {#if images.length > 1}
      <button on:click={prev} class="absolute left-2 top-1/2">‹</button>
      <button on:click={next} class="absolute right-2 top-1/2">›</button>
    {/if}

  </div>
{/if}
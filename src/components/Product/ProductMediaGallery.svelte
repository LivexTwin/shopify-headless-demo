<script>
import ShopifyImage from "@components/ShopifyImage.svelte";

  export let images = [];
  export let productHandle = "";
  export let altBase = "";
  export let variant = "compact"; // "compact" | "editorial" | "swipe"

  let index = 0;

function next() {

  if (index < images.length - 1) index += 1;
}

function prev() {

  if (index > 0) index -= 1;
}

</script>

{#if variant === "compact"}
  <div class="relative aspect-square w-full overflow-hidden">

    

{#key index}
  <ShopifyImage
    image={images[index] ? {
      url: images[index].url,
      altText: images[index].altText || altBase,
      width: 800,
      height: 800
    } : null}
    classList="absolute inset-0 w-full h-full object-cover"
  />
{/key}

    <!-- minimal controls -->
    {#if images.length > 1}
<button
  on:click={prev}
  class="absolute left-3 top-1/2 -translate-y-1/2
         -translate-x-1/2
         w-12 h-12 flex items-center justify-center"
>
  <span class="text-sm leading-none">‹</span>
</button>

<button
  on:click={next}
  class="absolute right-3 top-1/2 -translate-y-1/2
         translate-x-1/2
         w-12 h-12 flex items-center justify-center"
>
  <span class="text-sm leading-none">›</span>
</button>
    {/if}
  
  </div>
<div class="flex justify-between items-center p-2">
  <p class="text-[11px] opacity-50 tracking-wider">
    {index + 1} / {images.length}
  </p>

  <a
    href={`/products/${productHandle}`}
    class="text-xs uppercase tracking-wider underline opacity-50"
  >
    Full View
  </a>
</div>
  
{:else if variant === "swipe"}
  <div class="flex overflow-x-auto snap-x snap-mandatory h-[400px]">
    {#each images as image}
      <div class="min-w-full snap-center">
        <ShopifyImage
          image={{
            url: image.url,
            altText: image.altText || altBase,
            width: 1200,
            height: 1600
          }}
          classList="w-full h-full object-cover"
        />
      </div>
    {/each}
  </div>

  {:else if variant === "editorial"}
  <div class="flex flex-col">
    {#each images as image}
      <ShopifyImage
        image={{
          url: image.url,
          altText: image.altText || altBase,
          width: 1600,
          height: 2000
        }}
        classList="w-full h-auto object-cover"
      />
    {/each}
  </div>

{/if}
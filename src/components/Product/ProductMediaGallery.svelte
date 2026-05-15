<script>
import ShopifyImage from "@components/ShopifyImage.svelte";

  export let images = [];
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
<p class="absolute bottom-2 right-2 text-[11px] opacity-50 tracking-wider">
  {index + 1} / {images.length}
</p>

    <!-- minimal controls -->
    {#if images.length > 1}
      <button on:click={prev} class="absolute left-2 top-1/2">‹</button>
      <button on:click={next} class="absolute right-2 top-1/2">›</button>
    {/if}

  </div>

  
{:else if variant === "swipe"}
  <div class="flex overflow-x-auto snap-x snap-mandatory">
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
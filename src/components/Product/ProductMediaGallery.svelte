<script>
import ShopifyImage from "@components/ShopifyImage.svelte";

  export let images = [];
  export let productHandle = "";
  export let altBase = "";
  export let variant = "compact"; // "compact" | "editorial" | "swipe"

  let index = 0;

function limit() {
  return variant === "compact" ? 2 : images.length;
}

function next() {
  if (index < limit() - 1) index += 1;
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
        loading={index === 0 ? "eager" : "lazy"}
        classList="absolute inset-0 w-full h-full object-contain"
      />
    {/key}

    {#if images.length > 1}
      <button
        on:click={prev}
        class="absolute left-1 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center"
      >
        ‹
      </button>

      <button
        on:click={next}
        class="absolute right-1 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 flex items-center justify-center"
      >
        ›
      </button>
    {/if}

  </div>


   <div class="flex justify-between items-center p-2">
  <p class="text-[11px] opacity-50 tracking-wider">
    {index + 1} / {variant === "compact" ? 2 : images.length}
  </p>

  <a
    href={`/products/${productHandle}`}
    class="text-xs uppercase tracking-wider underline opacity-50"
  >
    Full View
  </a>
</div>
  
{:else if variant === "swipe"}
  <div class="flex overflow-x-auto snap-x snap-mandatory h-[400px] ">
    {#each images as image, i}
      <div class="min-w-full snap-center">
        <ShopifyImage
          image={{
            url: image.url,
            altText: image.altText || altBase,
            width: 1200,
            height: 1600
          }}
          loading={i === 0 ? "eager" : "lazy"}  
          classList="w-full h-full object-contain"
        />
      </div>
    {/each}
  </div>

  {:else if variant === "editorial"}
  <div class="flex flex-col gap-35">
   {#each images as image, i}
      <ShopifyImage
        image={{
          url: image.url,
          altText: image.altText || altBase,
          width: 600,
          height: 900
        }}
        loading={i === 0 ? "eager" : "lazy"}
        classList="w-full h-[680px] object-contain"
      />
    {/each}
  </div>

{/if}
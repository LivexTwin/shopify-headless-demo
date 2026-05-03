<script>
  import ShopifyImage from '../ShopifyImage.svelte';

  export let images = [];
  export let altBase = '';

  let featuredIndex = 0;

  function selectImage(index) {
    featuredIndex = index;
  }

  // Reset index if images change
  $: if (featuredIndex >= images.length) {
    featuredIndex = 0;
  }

  // Safe active image
  $: activeImage = images?.[featuredIndex] ?? null;

</script>

<div class="flex flex-col sm:flex-row gap-4">

  <!-- MAIN IMAGE (always uses ShopifyImage fallback system) -->
  <div class="relative aspect-square w-full max-w-[600px] overflow-hidden rounded-lg">

    <ShopifyImage
      image={activeImage
        ? {
            url: activeImage.url,
            altText: activeImage.altText || altBase,
            width: 600,
            height: 600,
          }
        : null}
      loading="eager"
      classList="absolute inset-0 w-full h-full object-cover transition duration-300 ease-in-out"
      sizes="(max-width: 640px) 100vw, 600px"
    />

    {#if images.length > 0}
      <div class="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {featuredIndex + 1}/{images.length}
      </div>
    {/if}

  </div>

  <!-- THUMBNAILS -->
  <div
    class="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible max-w-full sm:max-w-none"
    role="group"
    aria-label="Product image thumbnails"
  >

  {#each (images ?? []).filter(Boolean).filter(img => img.url) as image, index (image.url)}
      <button
        class="relative aspect-square w-20 sm:w-[100px] rounded transition-opacity duration-200"
        class:opacity-100={index === featuredIndex}
        class:opacity-60={index !== featuredIndex}
        aria-label={`View image ${index + 1}`}
        aria-pressed={index === featuredIndex}
        on:click={() => selectImage(index)}
      >
        <ShopifyImage
          image={{
            url: image.url,
            altText: image.altText || altBase,
            width: 100,
            height: 100,
          }}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          classList="absolute inset-0 h-full w-full object-cover rounded"
          sizes="(max-width: 640px) 80px, 100px"
        />
      </button>
    {/each}

  </div>
</div>
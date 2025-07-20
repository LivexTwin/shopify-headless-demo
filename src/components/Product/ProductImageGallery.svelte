<script>
  import ShopifyImage from '../ShopifyImage.svelte';
  export let images = [];
  export let altBase = '';

  let featuredIndex = 0;

  function selectImage(index) {
    featuredIndex = index;
  }
</script>

<div class="flex flex-col sm:flex-row gap-4">
  {#if images.length > 0}
    <!-- Main Featured Image -->
    <div class="relative aspect-square w-full max-w-[600px] overflow-hidden rounded-lg">
      {#key images[featuredIndex].url}
        <ShopifyImage
          image={{
            url: images[featuredIndex].url,
            altText: images[featuredIndex].altText || altBase,
            width: 600,
            height: 600,
          }}
          loading="eager"
          classList="absolute inset-0 w-full h-full object-cover transition duration-300 ease-in-out"
          sizes="(max-width: 640px) 100vw, 600px"
        />
      {/key}
      <!-- Optional: Index indicator -->
      <div class="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {featuredIndex + 1}/{images.length}
      </div>
    </div>
  {/if}

  <!-- Thumbnails -->
  <div
    class="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible max-w-full sm:max-w-none"
    role="group"
    aria-label="Product image thumbnails"
  >
  {#each images as image, index (image.url)}
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

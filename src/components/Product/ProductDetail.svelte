<script>
import VariantSelector from './VariantSelector.svelte';
  import ProductAddToCart from './ProductAddToCart.svelte';
  import ShopifyImage from '../ShopifyImage.svelte';
  import SoldOut from './SoldOut.svelte';
  export let product; 

  // Initialize selectedVariantId with the first variant's ID or null if no variants exist
let selectedVariantId = product.variants?.[0]?.id ?? null;


  function handleVariantSelect(id) {
    selectedVariantId = id;
  }
</script>

<article class="product-detail">
  <h1>{product.title}</h1>
  {#each product.images ?? [] as image (image.url)}
    <ShopifyImage
      image={{
        url: image.url,
        altText: image.altText || product.title,
        width: 400,
        height: Math.round(400 * (image.height / image.width))  // keep aspect ratio
      }}
      loading="lazy"
      sizes="(max-width: 600px) 100vw, 400px"
      classList="product-detail__image"
    />
  {/each}
  <SoldOut variants={product.variants} />
  <p>{product.description}</p>

  <section class="product-purchase">
  

    <VariantSelector
      variants={product.variants}
        productId={product.id}
      onSelect={handleVariantSelect}
    />
    
 <ProductAddToCart variants={product.variants} variantId={selectedVariantId} />

  </section>
</article>



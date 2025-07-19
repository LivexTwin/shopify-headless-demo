<script>
  import VariantSelector from './VariantSelector.svelte';
  import ProductAddToCart from './ProductAddToCart.svelte';
  import SoldOut from './SoldOut.svelte';
  import ProductImageGallery from './ProductImageGallery.svelte';

  export let product;

  let selectedVariantId = product.variants?.[0]?.id;
  let selectedVariant = product.variants?.[0];

  function handleVariantSelect(variantId) {
    selectedVariantId = variantId;
    selectedVariant = product.variants.find(v => v.id === variantId);
  }
</script>

<article class="product-detail max-w-6xl mx-auto px-4 py-10">
    <slot />    <!-- // Allows for additional content like breadcrumbs or reviews to be injected -->

  <div class="flex flex-col lg:flex-row gap-10">
    <div class="lg:w-1/2">
      <ProductImageGallery
        images={product.images}
        altBase={product.title}
        transitionId={`product-image-${product.handle}`}
      />
    </div>

    <div class="lg:w-1/2 mt-6 lg:mt-0">
      <h1 class="text-3xl font-bold mb-4">{product.title}</h1>

      <SoldOut variants={product.variants} />

      <section class="product-purchase space-y-4 mt-4">
        <VariantSelector
          variants={product.variants}
          productId={product.id}
          onSelect={handleVariantSelect}
        />

        <ProductAddToCart
          variants={product.variants}
          variantId={selectedVariantId}
        />
      </section>

      <section class="product-description pt-8">
        <h2 class="text-lg font-semibold mb-2">Product Description</h2>
        <div class="text-gray-700 leading-relaxed">
          {@html product.descriptionHtml}
        </div>
      </section>
    </div>
  </div>
</article>

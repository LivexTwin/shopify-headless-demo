<script>
  import ShopifyImage from "@components/ShopifyImage.svelte";
  import Money from "@components/Money.svelte";
  import { removeCartLine } from "@lib/cartActions";

  import { normalizeProductImage } from "@lib/normalizeProductImage.ts";


  export let line;
</script>

<div class="flex  mb-[1px] rounded-[2px] bg-gray-100 gap-2 pr-2">

  <!-- IMAGE -->
  <div class="shrink-0 bg-white">
    <ShopifyImage
      image={normalizeProductImage(line.merchandise.product)}
      loading="lazy"
      classList="w-[3rem] h-[3rem]  object-contain"
      sizes="(max-width: 40px) 40px, 40px"
      width={40}
      height={40}
    />
  </div>

  <!-- CENTER TEXT -->
  <div class="flex-1 min-w-0 b py-2">

    <!-- TITLE -->
    <p class="text-xs uppercase leading-tight">
      {line.merchandise.product.title}
    </p>

    <!-- VARIANT + QUANTITY -->
    <p class="text-xs font-medium opacity-60 mt-1">
      {line.merchandise.title} - {line.quantity}
    </p>

  </div>

  <!-- RIGHT -->
  <div class="flex flex-col items-end text-right pt-2">

    <!-- PRICE -->
    <div class="text-xs">
    <Money
     amount={line.merchandise.price.amount}
     currencyCode={line.merchandise.price.currencyCode}
    />
    </div>

    <!-- REMOVE -->
    <button
      class="text-xs font-medium opacity-50  hover:opacity-30 transition"
      on:click={() => removeCartLine(line.id)}
    >
      Remove
    </button>

  </div>

</div>
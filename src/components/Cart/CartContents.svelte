<script>
  import { debounce } from '@utils/debounce.js';
  import ShopifyImage from '../ShopifyImage.svelte';
  import { isOnlyOneLeft } from '@utils/product.js';
  import Money from '../Money.svelte';

  export let cart;
  export let onUpdateQuantity;
  export let onRemoveLine;
  export const loadingLineId = null;

  const debouncedUpdateQuantity = debounce(onUpdateQuantity, 300);

  function increment(line) {
    if (line.quantity < line.merchandise.quantityAvailable) {
      debouncedUpdateQuantity(line.id, line.quantity + 1);
    }
  }

  function decrement(line) {
    if (line.quantity > 0) {
      debouncedUpdateQuantity(line.id, line.quantity - 1);
    }
  }

  function onInputChange(line, e) {
    let qty = +e.target.value;
    if (qty > line.merchandise.quantityAvailable) {
      qty = line.merchandise.quantityAvailable;
    }
    if (qty < 0) qty = 0;
    debouncedUpdateQuantity(line.id, qty);
  }
</script>

<ul class="space-y-6">
  {#each cart.lines as line, index (line.id)}
    <li class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 p-4 rounded-xl shadow-sm">
      <div class="flex gap-4 items-start sm:items-center">
        
        <a href={`/products/${line.merchandise.product.handle}`}>
          <ShopifyImage
            image={{
              url: line.merchandise.product.images[0]?.url,
              altText: line.merchandise.product.images[0]?.altText || line.merchandise.product.title,
              width: 100,
              height: Math.round(100 * (line.merchandise.product.images[0]?.height / line.merchandise.product.images[0]?.width))
            }}
               loading={index === 0 ? "eager" : "lazy"}
            classList="rounded-md"
          />
        </a>
        <div>
          <h2 class="font-semibold text-gray-900">
            <a href={`/products/${line.merchandise.product.handle}`}>
              {line.merchandise.product.title}
            </a>
          </h2>

          {#if isOnlyOneLeft(line.merchandise)}
        <p class="text-sm text-red-600">Only one left!</p>
          {/if}
          <p class="text-sm text-gray-600">Options: {line.merchandise.title}</p>
          <p class="text-sm text-gray-600">Quantity: {line.quantity}</p>
          <Money
            amount={line.merchandise.price.amount}
            currencyCode={line.merchandise.price.currencyCode}
          />
        </div>
      </div>

      <div class="flex items-center gap-2 mt-2 sm:mt-0">
        <button
          on:click={() => decrement(line)}
          disabled={line.quantity === 0}
          class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >-</button>

      <label class="sr-only" for={`quantity-${line.id}`}>Quantity</label>
 <input
  id={`quantity-${line.id}`}
  type="number"
  min="0"
  max={line.merchandise.quantityAvailable}
  value={line.quantity}
  on:change={e => onInputChange(line, e)}
  class="w-14 px-2 py-1 border border-gray-300 rounded text-center"
/>
        <button
          on:click={() => increment(line)}
          disabled={line.quantity >= line.merchandise.quantityAvailable}
          class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >+</button>

      <button
  on:click={() => onRemoveLine(line.id)}
  aria-label="Remove line"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-5 w-5"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
</button>

      </div>
    </li>
  {/each}
</ul>

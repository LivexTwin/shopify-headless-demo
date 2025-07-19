<script>
  import { debounce } from '@utils/debounce.js';
  import ShopifyImage from '../ShopifyImage.svelte';
  import Money from '../Money.svelte';

  export let cart;
  export let onUpdateQuantity;
  export let onRemoveLine;

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
  {#each cart.lines as line (line.id)}
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
            loading="lazy"
            classList="rounded-md"
          />
        </a>
        <div>
          <h2 class="font-semibold text-gray-900">
            <a href={`/products/${line.merchandise.product.handle}`}>
              {line.merchandise.product.title}
            </a>
          </h2>
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
          class="ml-4 text-red-500 hover:underline text-sm"
        >
          Remove
        </button>
      </div>
    </li>
  {/each}
</ul>

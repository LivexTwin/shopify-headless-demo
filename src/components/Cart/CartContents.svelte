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

<ul>
  {#each cart.lines as line (line.id)}
    <li>
     <h2>
      <a href={`/products/${line.merchandise.product.handle}`}>
    {line.merchandise.product.title}
      </a>
       </h2>
      <p>Quantity: {line.quantity}</p>
      <p>Options: {line.merchandise.title}</p>
      <button on:click={() => decrement(line)} disabled={line.quantity === 0}>-</button>
      <input
        type="number"
        min="0"
        max={line.merchandise.quantityAvailable}
        value={line.quantity}
        on:change={e => onInputChange(line, e)}
      />
      <button on:click={() => increment(line)} disabled={line.quantity >= line.merchandise.quantityAvailable}>+</button>

      <Money
        amount={line.merchandise.price.amount}
        currencyCode={line.merchandise.price.currencyCode}/>

        <a href={`/products/${line.merchandise.product.handle}`}>
          <ShopifyImage
            image={{
             url: line.merchandise.product.images[0]?.url,
             altText: line.merchandise.product.images[0]?.altText || line.merchandise.product.title,
               width: 150,
                  height: Math.round(150 * (line.merchandise.product.images[0]?.height / line.merchandise.product.images[0]?.width))
              }}
               loading="lazy"
              classList="cart-line__image"
          />
        </a>

      <button on:click={() => onRemoveLine(line.id)}>Remove</button>
    </li>
  {/each}
</ul>

<script>
import { isCompletelySoldOut } from "@utils/product";
import { cart, cartId } from "@stores/cart";
import { createCart, addToCart } from "@lib/cartService";



  export let variants = [];        
  export let variantId = null;      

let soldOut = false;
$: soldOut = isCompletelySoldOut(variants);


  async function handleAddToCart() {
    if (soldOut) return;

    let id = $cartId;
    if (!id) {
      const newCart = await createCart();
      if (!newCart) return;
      cartId.set(newCart.id);
      cart.set(newCart);
      id = newCart.id;
    }
    const updatedCart = await addToCart(id, variantId, 1);
    if (updatedCart) {
      cart.set(updatedCart);
    }
  }
</script>

<button
  on:click={handleAddToCart}
  disabled={soldOut}
  aria-disabled={soldOut}
  aria-live="polite"
  aria-label={soldOut ? "Product is sold out" : "Add product to cart"}
  type="button"
>
  {soldOut ? 'Sold Out' : 'Add to Cart'}
</button>

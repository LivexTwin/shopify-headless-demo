<script>
  import { onMount } from 'svelte';
  import { initCart } from '@lib/cartActions';

  let initialized = false;

  onMount(() => {
    if (initialized) return;
    initialized = true;

    initCart();
  });
</script>

<slot />
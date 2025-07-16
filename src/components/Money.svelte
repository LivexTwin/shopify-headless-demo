<script lang="ts">
  export let amount: string | number;
  export let currencyCode: string = 'USD'; // fallback default

  $: formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  }).format(Number(amount));
</script>

<span>{formatted}</span>

<script lang="ts">
  export let amount: string | number;
  export let currencyCode: string = 'USD'; // fallback default

  $: formattedParts = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  }).formatToParts(Number(amount));
</script>

<span class="text-sm">
  {#each formattedParts as part}
    {#if part.type === 'currency'}
      <span style="font-size: 0.5em; vertical-align: middle; ">{part.value}</span>
    {:else}
      {part.value}
    {/if}
  {/each}
</span>

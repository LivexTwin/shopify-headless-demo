<script lang="ts">
  import { onMount } from 'svelte';

  export let classList = "";
  export let aspectRatio: string | undefined = undefined;

  let shell: HTMLElement;
  let ready = false;

  onMount(() => {
    const img = shell.querySelector('img');
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      ready = true;
      return;
    }

    img.addEventListener('load', () => { ready = true; }, { once: true });
    img.addEventListener('error', () => { ready = true; }, { once: true });
  });
</script>

<div
  bind:this={shell}
  class="progressive {classList}"
  style={aspectRatio ? `aspect-ratio: ${aspectRatio}` : undefined}
>
  {#if !ready}
    <div class="placeholder" aria-hidden="true">
      <img src="/placeholder.svg" alt="" />
    </div>
  {/if}
  <slot />
</div>

<style>
  .progressive {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
  }

  .placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 0;
  }

  .placeholder img {
    width: 40%;
    height: 40%;
    object-fit: contain;
    opacity: 0.12;
  }

  /* Real image sits above placeholder naturally */
  .progressive :global(img:not(.placeholder img)) {
    position: relative;
    z-index: 1;
  }
</style>
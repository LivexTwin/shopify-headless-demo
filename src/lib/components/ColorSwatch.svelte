<script>
  export let colors = [];
  export let selected;
  export let onSelect;
  export let hasAvailableOption;
  export let size = "sm";

  $: sizeClass =
    size === "lg"
      ? "w-5 h-5"
      : "w-3 h-3";

  function isColorAvailable(color) {
    return hasAvailableOption?.("Color", color.name);
  }
</script>

<div class="flex gap-[0.075rem] flex-wrap">
  {#each colors as color}

    <button
      type="button"
      on:click={() => isColorAvailable(color) && onSelect(color.name)}
      disabled={!isColorAvailable(color)}
      aria-disabled={!isColorAvailable(color)}
      class:opacity-40={!isColorAvailable(color)}
      class={`relative rounded-xs border flex items-center justify-center ${sizeClass}`}
      class:pointer-events-none={!isColorAvailable(color)}
      style="background-color: {color.swatch?.color}"
      aria-label={color.name}
    >

      {#if selected === color.name}
      <span class="text-[8px] font-bold text-white drop-shadow-[0_0_2px_black]">
        X
      </span>
      {/if}

      <span class="sr-only">{color.name}</span>
    </button>

  {/each}
</div>
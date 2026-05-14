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
</script>

<div class="flex gap-[0.075rem] flex-wrap">
  {#each colors as color}

    <button
      type="button"
      on:click={() => onSelect(color.name)}
      disabled={!hasAvailableOption("Color", color.name)}
      class={`relative rounded-xs border flex items-center justify-center ${sizeClass}`}
      style="background-color: {color.swatch?.color}"
      aria-label={color.name}
    >

      {#if selected === color.name}
        <span class="text-[10px] font-bold text-white mix-blend-difference">
          <!-- × -->
           x
        </span>
      {/if}

      <span class="sr-only">{color.name}</span>
    </button>

  {/each}
</div>
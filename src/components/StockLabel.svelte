<script lang="ts">
  import { getDropState } from "@utils/product";

  export let variants: any[] = [];

  const DROP_SIZE = 18;
  

  const drop = getDropState(variants, DROP_SIZE);
</script>

<div class="font-mono text-xs uppercase opacity-70 mb-6">
  {drop.label}
</div>
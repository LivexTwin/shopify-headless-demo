import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [svelte()],
  vite: {
    resolve: {
      alias: {
        "@components": "/src/components",
        "@utils": "/src/utils",
        "@lib": "/src/lib",
        "@stores": "/src/stores",
      },
    },
  },
});

import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [svelte(), sitemap()],
  prefetch: {
    prefetchAll: true,
  },

  vite: {
    resolve: {
      alias: {
        "@components": "/src/components",
        "@utils": "/src/utils",
        "@lib": "/src/lib",
        "@stores": "/src/stores",
      },
    },
    plugins: [tailwindcss()],
  },
  site: "https://malyxia.xyz",
});

import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()],
  },

  output: "static",

  build: {
    inlineStylesheets: "auto",
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  adapter: cloudflare(),
});
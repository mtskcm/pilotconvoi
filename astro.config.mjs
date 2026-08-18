// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pilotconvoislovakia.sk',
  // predbežné načítanie jazykových verzií, aby prepnutie jazyka bolo svižné
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk', 'en', 'pl', 'hu', 'de', 'uk'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

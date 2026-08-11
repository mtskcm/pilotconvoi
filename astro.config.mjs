// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// TODO: po kúpe vlastnej domény zmeniť `site` (ovplyvňuje sitemap, canonical a hreflang URL)
export default defineConfig({
  site: 'https://pilotconvoi.pages.dev',
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

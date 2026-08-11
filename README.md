# Pilot Convoi Slovakia

Prezentačný web firmy Pilot Convoi Slovakia — doprovody nadrozmerných vozidiel.
Single-page, 6 jazykov (SK/EN/PL/HU/DE/UK), statický Astro web hostovaný na Cloudflare Pages.

## Vývoj

```sh
npm install
npm run dev      # dev server na http://localhost:4321
npm run build    # produkčný build do dist/
npm run preview  # náhľad produkčného buildu
```

## Deploy

Push na `main` → Cloudflare Pages automaticky zbuilduje a nasadí
(build command `npm run build`, output directory `dist`).

Podrobnosti o projekte, brand farbách, prekladoch a otvorených úlohách: [CLAUDE.md](CLAUDE.md)

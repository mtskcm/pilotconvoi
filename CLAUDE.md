# Pilot Convoi Slovakia — prezentačný web

Single-page prezentačný web pre firmu **Pilot Convoi Slovakia** (doprovody nadrozmerných
vozidiel — pilotné vozidlá pre nadrozmerné/nadťažké prepravy). Trasy väčšinou od poľskej
hranice na Ukrajinu, do Maďarska a Rakúska. Web je čisto statický, hostovaný na
Cloudflare Pages, komunikačný jazyk s klientom je slovenčina.

## Stack

- **Astro 5** — statický výstup, žiadny backend
- **Tailwind CSS 4** — cez `@tailwindcss/vite` plugin, design tokens v `src/styles/global.css` (`@theme` blok)
- **GSAP + ScrollTrigger + Lenis** — scroll animácie v `src/scripts/main.ts`; všetko preskočené pri `prefers-reduced-motion`
- **@fontsource** — Chakra Petch (nadpisy, `font-display`) + Inter Variable (text, `font-sans`), self-hosted
- **@astrojs/sitemap** — sitemap sa generuje pri builde

Príkazy: `npm run dev` (dev server), `npm run build` (produkčný build do `dist/`).

## Brand

- Oranžová `#ff8319` (presne z loga), tmavá `#0c0c0e` (ink), povrchy `#131316` / `#1b1b21`, linky `#2a2a32`
- Claim: **Safe. Reliable. Professional.**
- Logá v `src/assets/logo/` — `logo-wide-white-text.png` je pre tmavé pozadie (header/footer),
  `logo-square-black-bg.png` je zdroj pre OG obrázok (`public/og.png`)
- Vizuál: tmavá téma s oranžovým glow (motív majáku pilotného vozidla), výstražné šrafovanie ako akcent
- Fotky v `src/assets/photos/` — `pilot-cars-night.jpg` (2 pilotné Škodovky v noci) je pozadie hero sekcie
  pod tmavým prekrytím; ďalšie fotky od suseda pôjdu sem

## Štruktúra

- Jedna stránka, 6 jazykov: `/` = SK (default), `/en/`, `/pl/`, `/hu/`, `/de/`, `/uk/`
- Preklady: `src/i18n/{sk,en,pl,hu,de,uk}.json` — všetky súbory majú identické kľúče,
  typ sa odvodzuje od `sk.json` (`Translation` v `src/i18n/index.ts`)
- Stránku skladá `src/components/OnePage.astro` (Nav → Hero → Services → About → RoutesSection → Gallery → Contact → Footer)
- Anchor ID sekcií sú jazykovo neutrálne: `#top`, `#services`, `#about`, `#routes`, `#gallery`, `#contact`
- Anchor scroll má offset 0 (hrana sekcie sadne pod fixný header — sekcia vyplní obrazovku);
  prepnutie jazyka vedie vždy na začiatok stránky (žiadne prenášanie #kotvy)
- Firemné údaje (telefón, e-mail, adresa) sú **len** v `src/config.ts` — nikde ich nehardcoduj

## Dôležité detaily

- **Web3Forms**: `WEB3FORMS_ACCESS_KEY` v `src/config.ts` je placeholder. Sused si má vytvoriť
  bezplatný účet na https://web3forms.com (na lubek@pcs.sk) a kľúč sa sem vloží. Dovtedy
  formulár po odoslaní zobrazí chybovú hlášku (telefón/e-mail fungujú vždy).
- **Galéria**: `GALLERY` pole v `src/config.ts` je prázdne → sekcia aj nav odkaz sa nerenderujú.
  Keď sused dodá fotky: uložiť do `src/assets/gallery/`, importnúť a pridať do poľa — sekcia sa objaví sama.
- **Doména**: `site` v `astro.config.mjs` je zatiaľ `https://pilotconvoi.pages.dev` a rovnaká URL
  je v `public/robots.txt` (Sitemap riadok). Po kúpe domény zmeniť na oboch miestach.
- **Preklady**: pri zmene textov meniť všetkých 6 JSON súborov naraz (rovnaké kľúče).
  Odborná terminológia: EN „oversized load escort / pilot car", PL „pilotaż ponadgabarytów",
  HU „túlméretes szállítmányok kísérése", DE „Begleitfahrzeug / Schwertransport", UK „супровід негабаритних вантажів".
- `reference/` obsahuje screenshoty starého Webnode webu a koncept infografiky trás — len ako
  podklad, nič z toho sa nepublikuje.

## Deploy (Cloudflare Pages)

Repo: https://github.com/mtskcm/pilotconvoi — push na `main` = automatický deploy (po prepojení).
Nastavenie v Cloudflare dashboarde: Workers & Pages → Create → Pages → Connect to Git →
build command `npm run build`, output `dist`, žiadne env premenné netreba.

## Návody pre suseda / používateľa

### Web3Forms (aktivácia formulára)
1. Otvoriť https://web3forms.com → „Create your Access Key"
2. Zadať e-mail **lubek@pcs.sk** (tam budú chodiť správy) → potvrdiť odkaz v e-maili
3. Skopírovať Access Key (UUID tvar) a vložiť do `src/config.ts` namiesto
   `REPLACE_WITH_WEB3FORMS_ACCESS_KEY`, potom build + deploy
4. Otestovať odoslaním skúšobnej správy z webu

### Google Search Console (po pripojení domény)
1. https://search.google.com/search-console → Add property → typ **Domain** → zadať doménu
2. Overenie cez DNS TXT záznam — keďže DNS bude v Cloudflare, záznam sa pridá v CF dashboarde (DNS → Add record → TXT)
3. Po overení: Sitemaps → odoslať `https://<domena>/sitemap-index.xml`
4. O pár dní skontrolovať Coverage/Pages — má byť zaindexovaných 6 stránok (jazykové verzie)

### Cloudflare Web Analytics (zadarmo, bez cookies)
1. CF dashboard → Workers & Pages → projekt **pilotconvoi** → záložka **Metrics/Analytics**
2. „Enable Web Analytics" — beacon skript sa injektuje automaticky, netreba meniť kód
3. Štatistiky potom v dashboarde: Analytics & Logs → Web Analytics

### Google Business Profile (panel vpravo vo vyhľadávaní + Mapy)
1. https://business.google.com → Add business → „Pilot Convoi Slovakia"
2. Kategória „Dopravná služba", adresa Sadová 621/54, Hanušovce nad Topľou, tel. +421 907 450 919,
   hodiny 24/7, web URL
3. Overenie (pošta/telefón/video) → po overení nahrať fotky áut a pýtať recenzie od zákazníkov

## Otvorené úlohy

- [ ] Web3Forms access key (čaká sa na registráciu suseda)
- [ ] Reálne fotky/videá do galérie (dodá sused); hero už má fotku pilotných áut
- [ ] Vlastná doména → aktualizovať `astro.config.mjs` + `robots.txt`
- [x] IČO/DIČ doplnené (z FinStatu): Pilot Convoi Slovakia, s. r. o., IČO 56184981,
  DIČ 2122232629, IČ DPH SK2122232629 (§4, od 1.5.2024) — v pätičke aj JSON-LD
- [ ] Google Business Profile (business.google.com) — založí/overí sused; kľúčové pre panel
  vpravo vo vyhľadávaní a Google Maps; kategória „Dopravná služba", otváracie hodiny 24/7, fotky, recenzie
- [ ] Google Search Console — po nasadení domény pridať property + odoslať sitemap
- [ ] Zvážiť FAQ sekciu s FAQPage schema (SEO + AI odpovede)
- [ ] Starý Webnode web zrušiť/presmerovať na novú doménu (duplicitný obsah)
- [x] Cloudflare Web Analytics zapnuté (12.8.2026) — beacon injektuje CF automaticky,
  štatistiky: CF dashboard → projekt pilotconvoi → Metrics

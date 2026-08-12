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

## Otvorené úlohy

- [ ] Web3Forms access key (čaká sa na registráciu suseda)
- [ ] Reálne fotky/videá do galérie a prípadne hero (dodá sused)
- [ ] Vlastná doména → aktualizovať `astro.config.mjs` + `robots.txt`

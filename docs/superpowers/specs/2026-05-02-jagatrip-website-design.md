# Design: JAGATRIP Website — Astro 6 + Bun

**Date:** 2026-05-02  
**Status:** Approved  
**Source:** `jagatrip.html` + `jagatrip-astro-bun-superprompt.md`

---

## Overview

Implementasi landing page JAGATRIP (PT JAGATRIP MITRA EDUKASI) sebagai website production-grade menggunakan Astro 6 + Bun. Output harus pixel-perfect identik dengan `jagatrip.html` — font, weight, italic, letter-spacing, semua effect, spacing, dan section order.

---

## Stack

| Layer | Pilihan | Versi |
|---|---|---|
| Framework | Astro | `^6.1.0` |
| Runtime/PM | Bun | `>=1.1.0` |
| Language | TypeScript strict | — |
| Styling | Tailwind CSS v4 + custom CSS layer | `^4.0.0` |
| Fonts | Astro Fonts API v6 (self-hosted) | — |
| Icons | Inline SVG + emoji unicode | — |
| Output | static | — |

---

## Project Structure

```
jagatrip-web/                          ← di dalam /home/ekalliptus/dev/jagatripid/
├── public/
│   ├── favicon.svg
│   ├── robots.txt                     ← allow AI bots (GEO)
│   └── llms.txt
├── src/
│   ├── components/
│   │   ├── brand/Logo.astro           ← SVG port dari clip-path source
│   │   ├── layout/
│   │   │   ├── Nav.astro              ← sticky + backdrop blur(10px)
│   │   │   ├── Footer.astro           ← 4-col grid, BG #050505
│   │   │   └── FloatingWA.astro       ← fixed bottom-right, scale(1.1) hover
│   │   ├── ui/
│   │   │   ├── Button.astro           ← btn-primary + btn-secondary variants
│   │   │   ├── Eyebrow.astro          ← JetBrains Mono 700, uppercase 4px tracking
│   │   │   ├── SectionTitle.astro     ← Fraunces 800, support .italic span
│   │   │   ├── HeroBadge.astro        ← pill + pulse dot
│   │   │   └── TrustItem.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── LogoBar.astro
│   │       ├── Problem.astro
│   │       ├── Solution.astro
│   │       ├── Stats.astro
│   │       ├── Destinations.astro
│   │       ├── Comparison.astro
│   │       ├── Testimonials.astro
│   │       ├── Process.astro
│   │       ├── UrgencyCta.astro       ← countdown dynamic ke 2026-05-16T23:59:59+07:00
│   │       ├── Faq.astro
│   │       └── FinalCta.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── destinations.json
│   │   ├── solutions.json
│   │   ├── problems.json
│   │   ├── testimonials.json
│   │   ├── process.json
│   │   ├── faqs.json
│   │   ├── stats.json
│   │   ├── partners.json
│   │   └── comparison.json
│   ├── data/site.ts                   ← kontak, URL, brand info (sumber tunggal)
│   ├── layouts/BaseLayout.astro       ← HTML shell + SEO + 7 JSON-LD schemas
│   ├── lib/
│   │   ├── seo.ts                     ← JSON-LD generators (7 schemas)
│   │   ├── faq-toggle.ts              ← vanilla accordion, no React
│   │   ├── countdown.ts               ← dynamic countdown ke target date
│   │   └── form-handler.ts            ← WhatsApp deep link generator
│   ├── pages/
│   │   ├── index.astro
│   │   └── 404.astro
│   └── styles/
│       ├── global.css                 ← entry: tailwind + tokens + components + animations
│       ├── tokens.css                 ← @theme: colors, gradients, spacing, radius, shadows
│       ├── components.css             ← recipe classes port dari source
│       └── animations.css            ← @keyframes pulse + reduce-motion guard
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── bun.lock
├── .env
└── .env.example
```

---

## Execution Strategy

### Phase 1 — Foundation (Sequential)

1. Scaffold: `bun create astro@latest jagatrip-web -- --template minimal --typescript strict`
2. Install deps: `tailwindcss @tailwindcss/vite @astrojs/sitemap @astrojs/check`
3. Setup `astro.config.mjs`: 3 fonts (Plus Jakarta Sans + Fraunces italic + JetBrains Mono), sitemap, env schema
4. Design system: port `:root` ke `tokens.css` (@theme), port semua recipe classes ke `components.css`, port `@keyframes` ke `animations.css`
5. Base components: `Logo.astro` (SVG), `BaseLayout.astro` (SEO + 7 JSON-LD), `Nav`, `Footer`, `FloatingWA`
6. UI primitives: `Button`, `Eyebrow`, `SectionTitle`, `HeroBadge`, `TrustItem`
7. Content JSON (9 files) + `src/data/site.ts` + lib scripts

### Phase 2 — Sections (4 Parallel Agents)

| Agent | Sections |
|---|---|
| Agent 1 | Hero + LogoBar + Stats |
| Agent 2 | Problem + Solution + Comparison |
| Agent 3 | Destinations + Testimonials + Process |
| Agent 4 | UrgencyCta + Faq + FinalCta |

Setiap agent menerima: design tokens, component interfaces, dan konten JSON yang relevan.

### Phase 3 — Composition & Polish (Sequential)

1. Compose `index.astro` (import + render 12 sections dalam urutan benar)
2. Bikin `404.astro`
3. `bun run build` → zero error
4. `bun run astro check` → zero TypeScript error
5. Verify visual match dengan source HTML

---

## Key Design Decisions

### Typography (WAJIB PERSIS)
- **Fraunces 900 italic** → hero h1 `.highlight`, stat numbers (64px), solution numbers (80px), urgency h2 italic, final CTA h2 italic
- **Fraunces 800** → semua `.section-title`
- **Fraunces 700** → solution card h3, dest card h3, logo-bar items, form title
- **Fraunces 500** → testimonial text (editorial feel)
- **JetBrains Mono 700** → HANYA `.section-eyebrow` (4px tracking, uppercase, orange)
- **Plus Jakarta Sans** → semua yang lain

### Effects (WAJIB DIPORT)
- Pulse dot animation 2s infinite (+ reduce-motion guard)
- Hero h1 highlight `::after` orange-light 8px underline
- Solution card `::before` scaleX(0→1) on hover
- Radial glows: hero top-right 500px, stats top-left 600px, final CTA centered 800px
- Nav backdrop-filter blur(10px)
- Countdown backdrop-filter blur(10px)
- FAQ `+` rotate 45deg on open
- Floating WA scale(1.1) hover
- Hero card-1 `🗼` emoji 200px opacity 0.15

### Form Handler
WhatsApp deep link generator: kumpulkan field form, encode ke pesan WA, redirect ke `https://wa.me/6281234567890?text=...`. Zero server dependency.

### Countdown
Dynamic countdown ke `2026-05-16T23:59:59+07:00` (14 hari dari sekarang sesuai nilai source). Update tiap detik via `setInterval`. Graceful: jika expired, tampilkan "0" semua field.

### SEO
7 JSON-LD schemas: Organization, LocalBusiness/TravelAgency, Service+OfferCatalog, WebSite+SearchAction, BreadcrumbList, FAQPage, AggregateRating.

---

## Acceptance Criteria

- `bun run build` zero error/warning
- `bun run astro check` zero error
- Bundle JS ≤ 8 KB gzipped
- Visual match pixel-perfect dengan `jagatrip.html`
- Lighthouse Performance ≥ 95, SEO = 100
- WCAG 2.1 AA: skip link, aria-expanded FAQ, form labels, aria-hidden decorative emoji
- Responsive: 1 breakpoint @968px

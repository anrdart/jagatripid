# JAGATRIP Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build pixel-perfect JAGATRIP landing page matching `jagatrip.html` using Astro 6 + Bun + Tailwind CSS v4.

**Architecture:** Sequential foundation (Tasks 1–15), parallel sections (Tasks 16–19, 4 independent agent groups), sequential composition (Tasks 20–21).

**Tech Stack:** Astro 6, Bun ≥1.1.0, Tailwind CSS v4 (@tailwindcss/vite), TypeScript strict, Google Fonts via fontProviders.google()

**Working directory:** `/home/ekalliptus/dev/jagatripid/` — all scaffold commands run here; project lands in `jagatrip-web/`.

---

## File Map

| File | Responsibility |
|---|---|
| `astro.config.mjs` | Fonts, sitemap, env schema, Tailwind vite plugin |
| `src/styles/tokens.css` | @theme color tokens + :root gradients/shadows/radius |
| `src/styles/components.css` | All CSS recipe classes ported from source HTML |
| `src/styles/animations.css` | @keyframes pulse + prefers-reduced-motion |
| `src/styles/global.css` | Entry: imports + resets + container |
| `src/data/site.ts` | Brand constants + typed contact info |
| `src/content/*.json` | 9 content data files |
| `src/components/brand/Logo.astro` | SVG shield logo |
| `src/lib/seo.ts` | 7 JSON-LD schema generators |
| `src/layouts/BaseLayout.astro` | HTML shell, SEO meta, Font, JSON-LD |
| `src/components/layout/Nav.astro` | Sticky nav + backdrop blur |
| `src/components/layout/Footer.astro` | 4-col footer |
| `src/components/layout/FloatingWA.astro` | Fixed WA button |
| `src/components/ui/*.astro` | Button, Eyebrow, SectionTitle, HeroBadge, TrustItem |
| `src/lib/faq-toggle.ts` | Vanilla accordion |
| `src/lib/countdown.ts` | Dynamic countdown |
| `src/lib/form-handler.ts` | WhatsApp deep link |
| `public/favicon.svg` | Shield SVG favicon |
| `public/robots.txt` | Allow AI bots |
| `public/llms.txt` | GEO brand summary |
| `src/components/sections/*.astro` | 12 section components |
| `src/pages/index.astro` | Page composition |
| `src/pages/404.astro` | Not found page |

---

## Task 1: Scaffold Project

**Files:** Creates `jagatrip-web/` directory with Astro minimal template

- [ ] **Step 1: Run scaffold**

```bash
cd /home/ekalliptus/dev/jagatripid
bun create astro@latest jagatrip-web -- --template minimal --typescript strict --no-git --install
```

Expected: `jagatrip-web/` created with `src/pages/index.astro`, `astro.config.mjs`, `tsconfig.json`, `package.json`

- [ ] **Step 2: Install additional dependencies**

```bash
cd jagatrip-web
bun add @astrojs/sitemap
bun add -d @astrojs/check tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Create directory structure**

```bash
mkdir -p src/components/brand src/components/layout src/components/ui src/components/sections
mkdir -p src/content src/data src/lib src/layouts src/styles
```

- [ ] **Step 4: Verify initial build**

```bash
bun run build
```

Expected: Build succeeds (default Astro page).

- [ ] **Step 5: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/
git commit -m "feat: scaffold Astro 6 + Bun project"
```

---

## Task 2: Configure astro.config.mjs

**Files:** Modify `jagatrip-web/astro.config.mjs`

- [ ] **Step 1: Write config**

```js
// jagatrip-web/astro.config.mjs
import { defineConfig, envField, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jagatrip.com',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-body',
      weights: [400, 500, 600, 700, 800],
    },
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      weights: [400, 500, 700, 900],
      styles: ['normal', 'italic'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 500, 700],
    },
  ],
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({ context: 'client', access: 'public', default: 'https://jagatrip.com' }),
      PUBLIC_WA_NUMBER: envField.string({ context: 'client', access: 'public', default: '6281234567890' }),
      PUBLIC_PHONE: envField.string({ context: 'client', access: 'public', default: '+62 812-3456-7890' }),
      PUBLIC_EMAIL: envField.string({ context: 'client', access: 'public', default: 'info@jagatrip.com' }),
    },
  },
});
```

- [ ] **Step 2: Create .env and .env.example**

```bash
# jagatrip-web/.env
cat > .env << 'EOF'
PUBLIC_SITE_URL=https://jagatrip.com
PUBLIC_WA_NUMBER=6281234567890
PUBLIC_PHONE=+62 812-3456-7890
PUBLIC_EMAIL=info@jagatrip.com
EOF

cp .env .env.example
```

- [ ] **Step 3: Verify build with new config**

```bash
bun run build 2>&1 | tail -20
```

Expected: Build succeeds. If fonts API error occurs, check Astro 6 docs at https://docs.astro.build/en/reference/experimental-flags/fonts/

- [ ] **Step 4: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/astro.config.mjs jagatrip-web/.env jagatrip-web/.env.example
git commit -m "feat: configure Astro 6 fonts, sitemap, env, Tailwind v4"
```

---

## Task 3: Design Tokens

**Files:** Create `jagatrip-web/src/styles/tokens.css`

- [ ] **Step 1: Write tokens.css**

```css
/* jagatrip-web/src/styles/tokens.css */

@theme {
  --color-orange: #FF6B35;
  --color-orange-dark: #E85A2C;
  --color-orange-light: #FFE4D6;
  --color-ink: #0A0A0A;
  --color-ink-deeper: #050505;
  --color-grey: #6B7280;
  --color-grey-light: #E5E7EB;
  --color-paper: #FAF7F2;
  --color-white: #FFFFFF;
  --color-green: #10B981;
  --color-wa-green: #25D366;
  --color-star: #FBBF24;
}

:root {
  /* Destination card gradients */
  --grad-japan:  linear-gradient(135deg, #DC2626, #FCA5A5);
  --grad-korea:  linear-gradient(135deg, #1E40AF, #93C5FD);
  --grad-spore:  linear-gradient(135deg, #DC2626, #F87171);
  --grad-msia:   linear-gradient(135deg, #047857, #6EE7B7);
  --grad-aus:    linear-gradient(135deg, #C2410C, #FDBA74);
  --grad-turki:  linear-gradient(135deg, #1F2937, #6B7280);
  --grad-egypt:  linear-gradient(135deg, #7C2D12, #FB923C);
  --grad-saudi:  linear-gradient(135deg, #166534, #86EFAC);

  /* Avatar gradients */
  --grad-avatar-1: linear-gradient(135deg, #047857, #34D399);
  --grad-avatar-2: linear-gradient(135deg, #1E40AF, #60A5FA);
  --grad-avatar-3: linear-gradient(135deg, #7C3AED, #C4B5FD);
  --grad-avatar-4: linear-gradient(135deg, #FF6B35, #FFB088);

  /* Hero card gradient */
  --grad-hero-card: linear-gradient(135deg, #FF6B35 0%, #FF8B5A 100%);

  /* Layout */
  --container-max: 1200px;
  --container-padding: 24px;
  --section-py: 100px;
  --section-py-mobile: 60px;

  /* Border radius */
  --radius-card: 24px;
  --radius-card-md: 20px;
  --radius-input: 16px;
  --radius-input-sm: 12px;
  --radius-pill: 100px;
  --radius-icon: 16px;
  --radius-circle: 50%;

  /* Shadows */
  --shadow-nav-cta:        0 4px 12px rgba(255, 107, 53, 0.25);
  --shadow-btn-primary:    0 8px 24px rgba(255, 107, 53, 0.35);
  --shadow-btn-hover:      0 12px 32px rgba(255, 107, 53, 0.45);
  --shadow-hero-card:      0 20px 50px rgba(0, 0, 0, 0.10);
  --shadow-comparison:     0 20px 50px rgba(0, 0, 0, 0.06);
  --shadow-solution-hover: 0 20px 40px rgba(255, 107, 53, 0.15);
  --shadow-testi-hover:    0 20px 40px rgba(0, 0, 0, 0.08);
  --shadow-form:           0 30px 60px rgba(0, 0, 0, 0.20);
  --shadow-wa:             0 10px 30px rgba(37, 211, 102, 0.40);
}
```

- [ ] **Step 2: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/styles/tokens.css
git commit -m "feat: add design tokens (colors, gradients, shadows, radius)"
```

---

## Task 4: Component CSS

**Files:** Create `jagatrip-web/src/styles/components.css`

- [ ] **Step 1: Write components.css** (port all recipe classes from `jagatrip.html` `<style>` block)

```css
/* jagatrip-web/src/styles/components.css */

/* ===== NAV ===== */
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-grey-light);
  padding: 16px 0;
}
.nav-inner {
  display: flex; justify-content: space-between; align-items: center;
  max-width: var(--container-max); margin: 0 auto;
  padding: 0 var(--container-padding);
}
.logo {
  display: flex; align-items: center; gap: 10px;
  font-weight: 800; font-size: 22px; color: var(--color-ink);
  text-decoration: none; letter-spacing: -0.5px;
}
.nav-cta {
  background: var(--color-orange); color: white;
  padding: 12px 24px; border-radius: var(--radius-pill);
  text-decoration: none; font-weight: 700; font-size: 14px;
  transition: all 0.2s; box-shadow: var(--shadow-nav-cta);
}
.nav-cta:hover { background: var(--color-orange-dark); transform: translateY(-1px); }

/* ===== BUTTONS ===== */
.btn-primary {
  background: var(--color-orange); color: white;
  padding: 18px 32px; border-radius: var(--radius-pill);
  text-decoration: none; font-weight: 700; font-size: 16px;
  transition: all 0.2s; box-shadow: var(--shadow-btn-primary);
  display: inline-flex; align-items: center; gap: 10px;
  border: none; cursor: pointer;
}
.btn-primary:hover {
  background: var(--color-orange-dark); transform: translateY(-2px);
  box-shadow: var(--shadow-btn-hover);
}
.btn-secondary {
  background: transparent; color: var(--color-ink);
  padding: 18px 28px; border-radius: var(--radius-pill);
  text-decoration: none; font-weight: 700; font-size: 16px;
  border: 2px solid var(--color-ink); transition: all 0.2s;
}
.btn-secondary:hover { background: var(--color-ink); color: white; }

/* ===== SECTION TYPOGRAPHY ===== */
.section-header { text-align: center; max-width: 720px; margin: 0 auto 60px; }
.section-eyebrow {
  font-family: var(--font-mono), 'JetBrains Mono', monospace;
  font-size: 12px; letter-spacing: 4px; text-transform: uppercase;
  color: var(--color-orange); margin-bottom: 16px; font-weight: 700;
}
.section-title {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: clamp(36px, 5vw, 52px); font-weight: 800;
  line-height: 1.1; letter-spacing: -1.5px; margin-bottom: 20px;
}
.section-title .italic { font-style: italic; color: var(--color-orange); }
.section-desc { font-size: 18px; color: var(--color-grey); line-height: 1.6; }

/* ===== HERO ===== */
.hero {
  background: linear-gradient(180deg, var(--color-paper) 0%, var(--color-white) 100%);
  padding: 60px 0 80px; position: relative; overflow: hidden;
}
.hero::before {
  content: ''; position: absolute; top: -100px; right: -100px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%);
  border-radius: 50%;
}
.hero-grid {
  display: grid; grid-template-columns: 1.1fr 1fr; gap: 60px;
  align-items: center; position: relative; z-index: 1;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--color-orange-light); color: var(--color-orange-dark);
  padding: 8px 16px; border-radius: var(--radius-pill);
  font-size: 13px; font-weight: 600; margin-bottom: 24px; letter-spacing: 0.5px;
}
.hero-badge .dot {
  width: 8px; height: 8px; background: var(--color-green);
  border-radius: 50%; flex-shrink: 0;
}
.hero h1 {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: clamp(40px, 6vw, 64px); font-weight: 900;
  line-height: 1.05; letter-spacing: -2px; margin-bottom: 24px; color: var(--color-ink);
}
.hero h1 .highlight {
  color: var(--color-orange); font-style: italic;
  position: relative; display: inline-block;
}
.hero h1 .highlight::after {
  content: ''; position: absolute; bottom: 4px; left: 0; right: 0;
  height: 8px; background: var(--color-orange-light); z-index: -1; border-radius: 4px;
}
.hero p.lead { font-size: 19px; color: var(--color-grey); margin-bottom: 32px; max-width: 540px; }
.hero-cta-group { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 40px; }
.hero-trust {
  display: flex; gap: 30px; flex-wrap: wrap; align-items: center;
  padding-top: 24px; border-top: 1px solid var(--color-grey-light);
}
.trust-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; color: var(--color-grey); font-weight: 600;
}
.trust-icon {
  width: 24px; height: 24px; background: var(--color-orange-light);
  color: var(--color-orange); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700;
}

/* ===== HERO VISUAL (3-CARD STACK) ===== */
.hero-visual { position: relative; height: 540px; }
.hero-card {
  position: absolute; background: white; border-radius: var(--radius-card);
  padding: 24px; box-shadow: var(--shadow-hero-card); transition: transform 0.3s;
}
.hero-card:hover { transform: translateY(-4px); }
.hero-card-1 {
  top: 0; left: 0; right: 60px; height: 280px;
  background: var(--grad-hero-card); color: white;
  display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;
}
.hero-card-1::after {
  content: '🗼'; position: absolute; font-size: 200px;
  right: -40px; bottom: -50px; opacity: 0.15;
}
.hero-card-1 .country {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: 32px; font-weight: 900; font-style: italic;
}
.hero-card-1 .duration { font-size: 13px; opacity: 0.9; text-transform: uppercase; letter-spacing: 2px; }
.hero-card-1 .price { font-size: 28px; font-weight: 800; margin-top: 8px; }
.hero-card-1 .price-label { font-size: 12px; opacity: 0.85; }
.hero-card-2 { bottom: 0; left: 40px; width: 280px; display: flex; align-items: center; gap: 14px; }
.hero-card-2-text strong { display: block; font-size: 15px; color: var(--color-ink); }
.hero-card-2-text span { font-size: 12px; color: var(--color-grey); }
.hero-card-3 { top: 100px; right: 0; width: 240px; background: white; padding: 20px; }
.hero-card-3 .stars { color: var(--color-star); font-size: 16px; margin-bottom: 8px; }
.hero-card-3 .review { font-size: 14px; color: var(--color-ink); font-weight: 600; margin-bottom: 8px; line-height: 1.4; }
.hero-card-3 .reviewer { font-size: 12px; color: var(--color-grey); }

/* ===== AVATAR STACK ===== */
.avatar-stack { display: flex; }
.avatar {
  width: 40px; height: 40px; border-radius: 50%; border: 3px solid white;
  margin-left: -10px; background: var(--grad-avatar-4);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 700; font-size: 14px;
}
.avatar:first-child { margin-left: 0; background: var(--grad-avatar-1); }
.avatar:nth-child(2) { background: var(--grad-avatar-2); }
.avatar:nth-child(3) { background: var(--grad-avatar-3); }

/* ===== LOGO BAR ===== */
.logo-bar { background: var(--color-paper); padding: 50px 0; text-align: center; }
.logo-bar-title {
  font-size: 13px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--color-grey); margin-bottom: 30px; font-weight: 600;
}
.logo-bar-grid {
  display: flex; justify-content: space-around; flex-wrap: wrap;
  gap: 40px; align-items: center; opacity: 0.6;
}
.logo-bar-item {
  font-family: var(--font-display), 'Fraunces', serif;
  font-weight: 700; font-size: 18px; color: var(--color-grey); letter-spacing: 1px;
}

/* ===== PROBLEM SECTION ===== */
.problem-section { background: var(--color-ink); color: white; }
.problem-section .section-eyebrow { color: var(--color-orange-light); }
.problem-section .section-title { color: white; }
.problem-section .section-desc { color: rgba(255,255,255,0.7); }
.problem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 50px; }
.problem-card {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-card-md); padding: 32px; transition: all 0.3s;
}
.problem-card:hover { background: rgba(255,255,255,0.08); transform: translateY(-4px); }
.problem-icon {
  width: 56px; height: 56px; background: rgba(255,107,53,0.15);
  color: var(--color-orange); border-radius: var(--radius-icon);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; margin-bottom: 20px;
}
.problem-card h3 { font-size: 20px; font-weight: 700; margin-bottom: 12px; color: white; }
.problem-card p { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6; }

/* ===== SOLUTION SECTION ===== */
.solution-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 60px; }
.solution-card {
  background: white; border: 1px solid var(--color-grey-light);
  border-radius: var(--radius-card); padding: 40px 32px;
  transition: all 0.3s; position: relative; overflow: hidden;
}
.solution-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 4px; background: var(--color-orange);
  transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
}
.solution-card:hover { border-color: var(--color-orange); transform: translateY(-6px); box-shadow: var(--shadow-solution-hover); }
.solution-card:hover::before { transform: scaleX(1); }
.solution-num {
  font-family: var(--font-display), 'Fraunces', serif;
  font-style: italic; font-size: 80px; font-weight: 900;
  color: var(--color-orange-light); line-height: 1; margin-bottom: -20px;
}
.solution-card h3 {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: 26px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.5px;
}
.solution-card p { font-size: 15px; color: var(--color-grey); line-height: 1.7; margin-bottom: 24px; }
.solution-features { list-style: none; }
.solution-features li {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 8px 0; font-size: 14px; color: var(--color-ink); font-weight: 500;
}
.solution-features li::before { content: '✓'; color: var(--color-orange); font-weight: 700; flex-shrink: 0; }

/* ===== STATS SECTION ===== */
.stats-section {
  background: linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-dark) 100%);
  color: white; padding: 80px 0; position: relative; overflow: hidden;
}
.stats-section::before {
  content: ''; position: absolute; top: -50%; left: -10%;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
}
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; position: relative; z-index: 1; }
.stat { text-align: center; }
.stat-num {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: 64px; font-weight: 900; line-height: 1; margin-bottom: 8px; font-style: italic;
}
.stat-label { font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; }

/* ===== DESTINATIONS ===== */
.destinations-section { background: var(--color-paper); }
.dest-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 50px; }
.dest-card {
  position: relative; height: 280px; border-radius: var(--radius-card-md);
  overflow: hidden; cursor: pointer; transition: transform 0.3s;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 24px; color: white;
}
.dest-card:hover { transform: translateY(-6px); }
.dest-card-1 { background: var(--grad-japan); }
.dest-card-2 { background: var(--grad-korea); }
.dest-card-3 { background: var(--grad-spore); }
.dest-card-4 { background: var(--grad-msia); }
.dest-card-5 { background: var(--grad-aus); }
.dest-card-6 { background: var(--grad-turki); }
.dest-card-7 { background: var(--grad-egypt); }
.dest-card-8 { background: var(--grad-saudi); }
.dest-card::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%);
}
.dest-flag { position: absolute; top: 20px; right: 20px; font-size: 32px; z-index: 1; }
.dest-content { position: relative; z-index: 1; }
.dest-content h3 {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: 26px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 6px;
}
.dest-content p { font-size: 13px; opacity: 0.9; }

/* ===== COMPARISON ===== */
.comparison-table {
  background: white; border-radius: var(--radius-card); overflow: hidden;
  box-shadow: var(--shadow-comparison); border: 1px solid var(--color-grey-light); margin-top: 60px;
}
.comp-row { display: grid; grid-template-columns: 1.5fr 1fr 1fr; border-bottom: 1px solid var(--color-grey-light); }
.comp-row:last-child { border-bottom: none; }
.comp-row.header { background: var(--color-paper); font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
.comp-cell {
  padding: 20px 24px; border-right: 1px solid var(--color-grey-light);
  display: flex; align-items: center; gap: 10px; font-size: 15px;
}
.comp-cell:last-child { border-right: none; }
.comp-cell.highlight { background: var(--color-orange-light); font-weight: 600; }
.comp-cell.highlight .check { color: var(--color-orange); font-weight: 800; font-size: 18px; }
.comp-cell .x { color: #DC2626; font-weight: 700; }
.comp-cell .check { color: var(--color-green); font-weight: 700; font-size: 18px; }

/* ===== TESTIMONIALS ===== */
.testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 50px; }
.testimonial {
  background: white; border: 1px solid var(--color-grey-light);
  border-radius: var(--radius-card); padding: 32px; transition: all 0.3s;
}
.testimonial:hover { box-shadow: var(--shadow-testi-hover); transform: translateY(-4px); }
.testimonial-stars { color: var(--color-star); font-size: 18px; margin-bottom: 16px; letter-spacing: 2px; }
.testimonial-text {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: 18px; font-weight: 500; line-height: 1.5;
  color: var(--color-ink); margin-bottom: 24px; letter-spacing: -0.3px;
}
.testimonial-author { display: flex; align-items: center; gap: 14px; }
.testimonial-avatar {
  width: 48px; height: 48px; border-radius: 50%;
  background: linear-gradient(135deg, var(--color-orange), var(--color-orange-dark));
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 700; font-size: 18px; flex-shrink: 0;
}
.testimonial-author-info strong { display: block; font-size: 15px; font-weight: 700; color: var(--color-ink); }
.testimonial-author-info span { font-size: 13px; color: var(--color-grey); }

/* ===== PROCESS ===== */
.process-section { background: var(--color-ink); color: white; }
.process-section .section-title { color: white; }
.process-section .section-eyebrow { color: var(--color-orange-light); }
.process-section .section-desc { color: rgba(255,255,255,0.7); }
.process-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 60px; }
.process-step {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-card-md); padding: 28px 20px; text-align: center; transition: all 0.3s;
}
.process-step:hover { background: rgba(255,107,53,0.1); border-color: var(--color-orange); transform: translateY(-4px); }
.process-num {
  width: 44px; height: 44px; background: var(--color-orange); color: white;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 18px; margin: 0 auto 16px;
}
.process-step h4 { font-size: 16px; font-weight: 700; margin-bottom: 10px; color: white; }
.process-step p { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }

/* ===== URGENCY CTA ===== */
.urgency-section {
  background: linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-dark) 100%);
  padding: 80px 0; color: white; position: relative; overflow: hidden;
}
.urgency-section::after {
  content: ''; position: absolute; top: 0; right: 0; width: 400px; height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
}
.urgency-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 1; }
.urgency-section h2 {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: 48px; font-weight: 900; line-height: 1.1; letter-spacing: -1.5px; margin-bottom: 20px;
}
.urgency-section h2 .italic { font-style: italic; }
.urgency-section > .container > .urgency-grid > div > p { font-size: 18px; opacity: 0.95; margin-bottom: 32px; line-height: 1.6; }
.countdown {
  background: rgba(0,0,0,0.2); border-radius: var(--radius-card-md); padding: 24px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
  margin-bottom: 32px; backdrop-filter: blur(10px);
}
.countdown-item { text-align: center; }
.countdown-num {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: 40px; font-weight: 900; line-height: 1;
}
.countdown-label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.85; margin-top: 4px; }
.urgency-form {
  background: white; color: var(--color-ink); border-radius: var(--radius-card);
  padding: 40px; box-shadow: var(--shadow-form);
}
.form-title {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: 26px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px;
}
.form-subtitle { font-size: 14px; color: var(--color-grey); margin-bottom: 24px; }
.form-group { margin-bottom: 16px; }
.form-group input, .form-group select {
  width: 100%; padding: 14px 18px; border: 1.5px solid var(--color-grey-light);
  border-radius: var(--radius-input-sm); font-size: 15px;
  font-family: var(--font-body), 'Plus Jakarta Sans', sans-serif; transition: border 0.2s;
}
.form-group input:focus, .form-group select:focus { outline: none; border-color: var(--color-orange); }
.form-cta {
  width: 100%; background: var(--color-orange); color: white;
  padding: 16px; border: none; border-radius: var(--radius-input-sm);
  font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 8px;
  font-family: var(--font-body), 'Plus Jakarta Sans', sans-serif;
}
.form-cta:hover { background: var(--color-orange-dark); transform: translateY(-1px); }
.form-disclaimer { font-size: 12px; color: var(--color-grey); text-align: center; margin-top: 12px; }

/* ===== FAQ ===== */
.faq-list { max-width: 800px; margin: 50px auto 0; }
.faq-item {
  border: 1px solid var(--color-grey-light); border-radius: var(--radius-input);
  margin-bottom: 12px; overflow: hidden; transition: all 0.2s;
}
.faq-item:hover { border-color: var(--color-orange); }
.faq-question {
  padding: 22px 28px; cursor: pointer; display: flex;
  justify-content: space-between; align-items: center;
  font-weight: 700; font-size: 16px; color: var(--color-ink); background: white;
  border: none; width: 100%; text-align: left;
  font-family: var(--font-body), 'Plus Jakarta Sans', sans-serif;
}
.faq-question::after { content: '+'; font-size: 24px; color: var(--color-orange); transition: transform 0.2s; font-weight: 300; }
.faq-item.open .faq-question::after { transform: rotate(45deg); }
.faq-answer {
  max-height: 0; overflow: hidden; transition: max-height 0.3s, padding 0.3s;
  padding: 0 28px; color: var(--color-grey); font-size: 15px; line-height: 1.7;
}
.faq-item.open .faq-answer { max-height: 300px; padding: 0 28px 22px; }

/* ===== FINAL CTA ===== */
.final-cta {
  background: var(--color-ink); padding: 100px 0; text-align: center;
  color: white; position: relative; overflow: hidden;
}
.final-cta::before {
  content: ''; position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%); width: 800px; height: 800px;
  background: radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 60%);
  border-radius: 50%;
}
.final-cta-content { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }
.final-cta h2 {
  font-family: var(--font-display), 'Fraunces', serif;
  font-size: clamp(40px, 6vw, 64px); font-weight: 900;
  line-height: 1.1; letter-spacing: -2px; margin-bottom: 20px;
}
.final-cta h2 .italic { font-style: italic; color: var(--color-orange); }
.final-cta p { font-size: 19px; opacity: 0.85; margin-bottom: 40px; line-height: 1.6; }

/* ===== FOOTER ===== */
.footer { background: var(--color-ink-deeper); color: rgba(255,255,255,0.6); padding: 60px 0 30px; font-size: 14px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.footer h4 { color: white; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; }
.footer ul { list-style: none; }
.footer ul li { margin-bottom: 10px; }
.footer ul a { color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
.footer ul a:hover { color: var(--color-orange); }
.footer-brand p { margin-top: 16px; line-height: 1.6; }
.footer-bottom {
  padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1);
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; font-size: 13px;
}

/* ===== FLOATING WA ===== */
.float-wa {
  position: fixed; bottom: 24px; right: 24px;
  width: 60px; height: 60px; background: var(--color-wa-green);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-wa); z-index: 99; cursor: pointer;
  transition: transform 0.2s; text-decoration: none; font-size: 28px;
}
.float-wa:hover { transform: scale(1.1); }

/* ===== RESPONSIVE ===== */
@media (max-width: 968px) {
  .hero-grid, .urgency-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-visual { height: 400px; }
  .problem-grid, .solution-grid, .testimonials-grid { grid-template-columns: 1fr; }
  .dest-grid { grid-template-columns: repeat(2, 1fr); }
  .process-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .comp-row { grid-template-columns: 1fr; }
  .comp-cell { border-right: none; border-bottom: 1px solid var(--color-grey-light); }
  .countdown { grid-template-columns: repeat(2, 1fr); }
  .nav-cta { padding: 10px 18px; font-size: 13px; }
}
```

- [ ] **Step 2: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/styles/components.css
git commit -m "feat: port all component CSS from source HTML"
```

---

## Task 5: Animations + global.css

**Files:** Create `jagatrip-web/src/styles/animations.css` and `jagatrip-web/src/styles/global.css`

- [ ] **Step 1: Write animations.css**

```css
/* jagatrip-web/src/styles/animations.css */

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

.hero-badge .dot { animation: pulse 2s infinite; }

@media (prefers-reduced-motion: reduce) {
  .hero-badge .dot { animation: none; }
  .hero-card, .problem-card, .solution-card, .dest-card,
  .testimonial, .process-step, .float-wa, .nav-cta,
  .btn-primary, .btn-secondary { transition: none !important; }
  .solution-card::before { transition: none !important; }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Write global.css**

```css
/* jagatrip-web/src/styles/global.css */
@import "tailwindcss";
@import "./tokens.css";
@import "./components.css";
@import "./animations.css";

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body), 'Plus Jakarta Sans', sans-serif;
  background: var(--color-white);
  color: var(--color-ink);
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.section { padding: var(--section-py) 0; }

@media (max-width: 968px) {
  .section { padding: var(--section-py-mobile) 0; }
}
```

- [ ] **Step 3: Remove default Astro styles** — delete `src/styles/global.css` if Astro scaffold created one, replace with the file above.

- [ ] **Step 4: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/styles/
git commit -m "feat: add animations.css and global.css entry"
```

---

## Task 6: Site Data + Env Files

**Files:** Create `jagatrip-web/src/data/site.ts`

- [ ] **Step 1: Write site.ts**

Note: Use `import.meta.env.PUBLIC_*` (not `astro:env/client`) so this file is safe in both server-side layouts and client scripts.

```typescript
// jagatrip-web/src/data/site.ts
const url    = import.meta.env.PUBLIC_SITE_URL  ?? 'https://jagatrip.com';
const phone  = import.meta.env.PUBLIC_PHONE     ?? '+62 812-3456-7890';
const email  = import.meta.env.PUBLIC_EMAIL     ?? 'info@jagatrip.com';
const waNum  = import.meta.env.PUBLIC_WA_NUMBER ?? '6281234567890';

export const site = {
  name: 'JAGATRIP',
  legalName: 'PT JAGATRIP MITRA EDUKASI',
  tagline: 'Buka Jendela Dunia untuk Generasi Indonesia',
  niche: 'Edutrip internasional untuk sekolah (SMA/SMP) & kampus Indonesia',
  description: 'Mitra edutrip internasional terpercaya untuk sekolah & kampus Indonesia. Tour leader bersertifikat HPI, asuransi 100%, kurikulum-aligned, halal terjamin.',
  url,
  phone,
  email,
  waNumber: waNum,
  waLink: `https://wa.me/${waNum}`,
  address: { city: 'Jakarta', country: 'Indonesia', region: 'ID' },
  foundingDate: '2026',
  lang: 'id',
  stats: { countries: '7+', students: '500+', schools: '50+', safety: '100%' },
} as const;

export type Site = typeof site;
```

- [ ] **Step 2: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/data/site.ts
git commit -m "feat: add site data with typed env vars"
```

---

## Task 7: Content JSON Files

**Files:** Create 9 JSON files in `jagatrip-web/src/content/`

- [ ] **Step 1: Write destinations.json**

```json
[
  { "id": "japan",  "flag": "🇯🇵", "name": "Jepang",        "desc": "Tokyo · Kyoto · Osaka — Teknologi & Disiplin",       "cardClass": "dest-card-1" },
  { "id": "korea",  "flag": "🇰🇷", "name": "Korea Selatan", "desc": "Seoul · Busan — K-Culture & Innovation",              "cardClass": "dest-card-2" },
  { "id": "spore",  "flag": "🇸🇬", "name": "Singapura",     "desc": "Smart City & Pendidikan Tinggi",                      "cardClass": "dest-card-3" },
  { "id": "msia",   "flag": "🇲🇾", "name": "Malaysia",      "desc": "KL · Penang — Multicultural Hub",                     "cardClass": "dest-card-4" },
  { "id": "aus",    "flag": "🇦🇺", "name": "Australia",     "desc": "Sydney · Melbourne — Top University",                  "cardClass": "dest-card-5" },
  { "id": "turki",  "flag": "🇹🇷", "name": "Turki",         "desc": "Istanbul · Cappadocia — Sejarah Peradaban",           "cardClass": "dest-card-6" },
  { "id": "egypt",  "flag": "🇪🇬", "name": "Mesir",         "desc": "Cairo · Alexandria — Cradle of Civilization",         "cardClass": "dest-card-7" },
  { "id": "saudi",  "flag": "🇸🇦", "name": "Arab Saudi",    "desc": "Mecca · Madinah — Spiritual Journey",                 "cardClass": "dest-card-8" }
]
```

- [ ] **Step 2: Write problems.json**

```json
[
  {
    "icon": "⚠️",
    "title": "Khawatir Keselamatan",
    "desc": "Membawa puluhan siswa ke luar negeri = ratusan pertanyaan dari orang tua. Bagaimana kalau ada yang sakit? Hilang paspor? Asuransi cukup? Tour leader ada 24 jam?"
  },
  {
    "icon": "📚",
    "title": "Kurang Edukatif",
    "desc": "Travel agent biasa menawarkan paket wisata standar — foto di depan landmark, belanja oleh-oleh. Tidak ada nilai pembelajaran, tidak terhubung dengan kurikulum sekolah."
  },
  {
    "icon": "💸",
    "title": "Harga Tidak Transparan",
    "desc": "Banyak penyelenggara yang menyembunyikan biaya, menambahkan charge mendadak, atau memberi fasilitas yang tidak sesuai janji. Sekolah jadi sulit dipercaya orang tua."
  }
]
```

- [ ] **Step 3: Write solutions.json**

```json
[
  {
    "num": "01",
    "title": "Education-First, Not Travel-First",
    "desc": "Setiap itinerary kami dirancang berbasis kurikulum sekolah, bukan sekadar destinasi. Setiap kunjungan punya learning objective yang jelas.",
    "features": ["Itinerary kurikulum-aligned", "Learning objective per kunjungan", "Sertifikat & laporan refleksi", "Buku jurnal edukatif peserta"]
  },
  {
    "num": "02",
    "title": "Indonesia Soul, Global Standard",
    "desc": "Kami memahami konteks Indonesia (sekolah, keluarga, kearifan lokal) sambil mengoperasikan standar internasional dalam safety dan quality.",
    "features": ["Tour leader sertifikasi HPI", "Mitra resmi land operator global", "Makanan halal & ibadah terjamin", "Komunikasi bahasa Indonesia"]
  },
  {
    "num": "03",
    "title": "Guardian-Level Care",
    "desc": "Logo kami adalah perisai dengan orang di dalam — bukan kebetulan. Kami memperlakukan setiap peserta seperti keluarga sendiri.",
    "features": ["Pendampingan 24/7 selama trip", "Asuransi internasional 100%", "Laporan harian ke orang tua", "Briefing pra-keberangkatan"]
  }
]
```

- [ ] **Step 4: Write stats.json**

```json
[
  { "num": "7+",   "label": "Negara Tujuan" },
  { "num": "500+", "label": "Siswa Tahun Ini" },
  { "num": "50+",  "label": "Sekolah Mitra" },
  { "num": "100%", "label": "Safety Record" }
]
```

- [ ] **Step 5: Write partners.json**

```json
["SMA AL-FATIHAH", "UNIV. NUSANTARA", "SMK GLOBAL", "SMA RAMAH", "SMP ALMADINAH", "YAYASAN AIS"]
```

- [ ] **Step 6: Write testimonials.json**

```json
[
  {
    "stars": 5,
    "text": "\"Anak saya pulang dengan pribadi yang berbeda. Lebih mandiri, lebih percaya diri, dan lebih semangat belajar. JAGATRIP bukan travel biasa — ini investasi pendidikan.\"",
    "initials": "SR",
    "name": "Ibu Sari Rahmawati",
    "role": "Orang Tua Peserta · SMA Al-Fatihah"
  },
  {
    "stars": 5,
    "text": "\"Sebagai kepala sekolah, saya memerlukan partner yang serius dalam pendidikan, bukan sekadar travel. JAGATRIP adalah jawabannya. Itinerary mereka bahkan lebih edukatif dari ekspektasi kami.\"",
    "initials": "BH",
    "name": "Bapak H. Hidayat, M.Pd",
    "role": "Kepala Sekolah · SMA Ramah Indonesia"
  },
  {
    "stars": 5,
    "text": "\"Saya pikir ke Tokyo cuma foto-foto. Ternyata kami diajak ke universitas, bertemu mahasiswa Indonesia di sana, dan ikut workshop. Saya jadi tahu mau kuliah di mana nanti!\"",
    "initials": "AR",
    "name": "Ahmad Rizky, 17",
    "role": "Peserta Edutrip Jepang 2026"
  }
]
```

- [ ] **Step 7: Write process.json**

```json
[
  { "num": "1", "title": "Konsultasi Gratis",   "desc": "Pemetaan kebutuhan sekolah, target peserta, dan anggaran." },
  { "num": "2", "title": "Itinerary Custom",    "desc": "Penyusunan itinerary kurikulum-aligned sesuai mata pelajaran." },
  { "num": "3", "title": "Pra-Keberangkatan",  "desc": "Briefing peserta, pengurusan dokumen, & pengecekan akhir." },
  { "num": "4", "title": "Perjalanan",          "desc": "Pendampingan 24/7 dengan tour leader bersertifikat HPI." },
  { "num": "5", "title": "Pasca-Trip",          "desc": "Evaluasi, sertifikat, jurnal refleksi, & alumni network." }
]
```

- [ ] **Step 8: Write faqs.json**

```json
[
  {
    "q": "Apakah JAGATRIP punya legalitas resmi?",
    "a": "Ya. Kami terdaftar resmi sebagai PT JAGATRIP MITRA EDUKASI dengan NIB, Sertifikat Standar Usaha Pariwisata, dan keanggotaan asosiasi resmi (ASITA). Semua dokumen legalitas tersedia untuk verifikasi sekolah dan orang tua.",
    "open": true
  },
  {
    "q": "Bagaimana sistem keamanan & asuransi peserta?",
    "a": "Setiap peserta dilindungi asuransi travel internasional premium yang mencakup kesehatan, kecelakaan, kehilangan dokumen, dan keterlambatan penerbangan. Tour leader bersertifikat HPI mendampingi 24/7. Update harian dikirim ke orang tua via WhatsApp grup.",
    "open": false
  },
  {
    "q": "Apakah makanan halal & jadwal ibadah terjamin?",
    "a": "Tentu. Kami memahami kebutuhan peserta Muslim Indonesia. Setiap itinerary memastikan: (1) restoran halal-certified atau prepared meal, (2) jadwal sholat masuk dalam itinerary, (3) info masjid terdekat di setiap destinasi, (4) pendamping yang memahami nilai Islami.",
    "open": false
  },
  {
    "q": "Berapa minimum peserta untuk paket grup?",
    "a": "Minimum 15 peserta untuk paket grup. Sekolah dengan 30+ peserta otomatis dapat 1-2 free seat untuk guru pendamping. Sekolah dengan 100+ peserta dapat customized package eksklusif dengan benefit tambahan.",
    "open": false
  },
  {
    "q": "Bagaimana jika anak saya pertama kali ke luar negeri?",
    "a": "Justru ini spesialisasi kami. Sebelum keberangkatan, peserta mendapat briefing lengkap (cara di bandara, etika di luar negeri, tips komunikasi, dll). Selama trip, tour leader berbahasa Indonesia mendampingi 24 jam. Banyak alumni kami yang sebelumnya tidak pernah ke luar negeri pulang dengan kepercayaan diri yang berbeda.",
    "open": false
  },
  {
    "q": "Apakah ada sistem cicilan?",
    "a": "Ya. Kami bekerja sama dengan bank mitra (BCA, Mandiri, BSI) untuk skema cicilan 6-12 bulan tanpa bunga. Untuk sekolah, tersedia juga skema kolektif: DP 30%, pelunasan H-30 keberangkatan.",
    "open": false
  },
  {
    "q": "Apa yang berbeda dari travel agent biasa?",
    "a": "Tiga hal utama: (1) Education-First — itinerary kami berbasis kurikulum, bukan hiburan saja. (2) Indonesia Soul, Global Standard — kami paham budaya Indonesia + standar internasional. (3) Guardian-Level Care — kami menjaga peserta seperti anak sendiri. Logo kami bahkan adalah perisai dengan orang di dalam.",
    "open": false
  }
]
```

- [ ] **Step 9: Write comparison.json**

```json
[
  { "aspect": "Itinerary",                "competitor": "Wisata umum",           "jagatrip": "Kurikulum-aligned" },
  { "aspect": "Tour Leader",              "competitor": "Guide pariwisata",       "jagatrip": "Edu-leader bersertifikat HPI" },
  { "aspect": "Asuransi",                 "competitor": "Standar minimal",        "jagatrip": "Premium internasional" },
  { "aspect": "Laporan ke Ortu",          "competitor": "Tidak ada",             "jagatrip": "Update harian via WA" },
  { "aspect": "Kebutuhan Halal & Ibadah", "competitor": "Tidak terjamin",        "jagatrip": "Terjamin penuh" },
  { "aspect": "Sertifikat & Refleksi",    "competitor": "Tidak ada",             "jagatrip": "Sertifikat + jurnal edukatif" },
  { "aspect": "Transparansi Biaya",       "competitor": "Sering ada hidden cost", "jagatrip": "All-in, tanpa biaya tersembunyi" }
]
```

- [ ] **Step 10: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/content/
git commit -m "feat: add 9 content JSON files"
```

---

## Task 8: Logo Component

**Files:** Create `jagatrip-web/src/components/brand/Logo.astro`

- [ ] **Step 1: Write Logo.astro**

```astro
---
// jagatrip-web/src/components/brand/Logo.astro
interface Props {
  size?: number;
  class?: string;
  color?: string;
}
const { size = 32, class: cn = '', color = 'var(--color-orange)' } = Astro.props;
const w = size;
const h = Math.round(size * 36 / 32);
---
<svg
  width={w}
  height={h}
  viewBox="0 0 32 36"
  xmlns="http://www.w3.org/2000/svg"
  class={cn}
  aria-hidden="true"
  focusable="false"
>
  <path d="M16 0 L32 6 L32 22 Q32 32 16 36 Q0 32 0 22 L0 6 Z" fill={color} />
  <circle cx="16" cy="13" r="4" fill="white" />
  <path d="M9 18 a7 4 0 0 1 14 0 L23 26 L9 26 Z" fill="white" />
</svg>
```

- [ ] **Step 2: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/components/brand/Logo.astro
git commit -m "feat: add Logo SVG component (port from clip-path)"
```

---

## Task 9: SEO Library

**Files:** Create `jagatrip-web/src/lib/seo.ts`

- [ ] **Step 1: Write seo.ts** (7 JSON-LD schemas)

```typescript
// jagatrip-web/src/lib/seo.ts
import type { Site } from '../data/site';

export function buildJsonLd(site: Site) {
  const base = site.url;
  const faqs = [
    { q: 'Apakah JAGATRIP punya legalitas resmi?', a: 'Ya. Kami terdaftar resmi sebagai PT JAGATRIP MITRA EDUKASI dengan NIB, Sertifikat Standar Usaha Pariwisata, dan keanggotaan ASITA.' },
    { q: 'Bagaimana sistem keamanan & asuransi peserta?', a: 'Setiap peserta dilindungi asuransi travel internasional premium. Tour leader bersertifikat HPI mendampingi 24/7.' },
    { q: 'Apakah makanan halal & jadwal ibadah terjamin?', a: 'Ya. Restoran halal-certified, jadwal sholat dalam itinerary, dan info masjid terdekat di setiap destinasi.' },
    { q: 'Berapa minimum peserta untuk paket grup?', a: 'Minimum 15 peserta. Sekolah dengan 30+ peserta mendapat 1-2 free seat untuk guru pendamping.' },
    { q: 'Apakah ada sistem cicilan?', a: 'Ya. Cicilan 6-12 bulan tanpa bunga bersama BCA, Mandiri, BSI. Skema kolektif: DP 30%, pelunasan H-30.' },
  ];

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: base,
    foundingDate: site.foundingDate,
    address: { '@type': 'PostalAddress', addressLocality: site.address.city, addressCountry: site.address.region },
    contactPoint: { '@type': 'ContactPoint', telephone: site.phone, contactType: 'customer service', availableLanguage: 'Indonesian' },
    sameAs: [`https://wa.me/${site.waNumber}`],
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: site.legalName,
    url: base,
    telephone: site.phone,
    email: site.email,
    address: { '@type': 'PostalAddress', addressLocality: site.address.city, addressCountry: site.address.region },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    priceRange: '$$',
    openingHours: 'Mo-Fr 08:00-17:00',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '50', bestRating: '5' },
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Edutrip Internasional JAGATRIP',
    description: site.description,
    provider: { '@type': 'Organization', name: site.legalName },
    areaServed: 'Indonesia',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '8 Destinasi Edutrip Internasional',
      itemListElement: [
        'Jepang', 'Korea Selatan', 'Singapura', 'Malaysia',
        'Australia', 'Turki', 'Mesir', 'Arab Saudi',
      ].map((dest, i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'TouristTrip', name: `Edutrip ${dest}`, touristType: 'Educational' },
        position: i + 1,
      })),
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: base,
    inLanguage: site.lang,
    potentialAction: { '@type': 'SearchAction', target: `${base}/?s={search_term_string}`, 'query-input': 'required name=search_term_string' },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Beranda', item: base }],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const aggregateRating = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Layanan Edutrip JAGATRIP',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '50', bestRating: '5', worstRating: '1' },
  };

  return [organization, localBusiness, service, website, breadcrumb, faqPage, aggregateRating];
}
```

- [ ] **Step 2: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/lib/seo.ts
git commit -m "feat: add 7 JSON-LD schema generators"
```

---

## Task 10: BaseLayout

**Files:** Create `jagatrip-web/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write BaseLayout.astro**

```astro
---
// jagatrip-web/src/layouts/BaseLayout.astro
import { Font } from 'astro:assets';
import { site } from '../data/site';
import { buildJsonLd } from '../lib/seo';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}

const {
  title = `${site.name} — Edutrip Internasional Terpercaya untuk Sekolah & Kampus Indonesia`,
  description = site.description,
  ogImage = `${site.url}/og-default.png`,
} = Astro.props;

const jsonLdSchemas = buildJsonLd(site);
const canonicalUrl = new URL(Astro.url.pathname, site.url).href;
---
<!doctype html>
<html lang={site.lang}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>

  <!-- SEO -->
  <meta name="description" content={description} />
  <meta name="keywords" content="edutrip, study tour, sekolah, kampus, internasional, Indonesia, educational travel" />
  <meta name="author" content={site.legalName} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
  <meta name="theme-color" content="#FF6B35" />
  <meta name="geo.region" content={site.address.region} />
  <meta name="geo.placename" content={`${site.address.city}, ${site.address.country}`} />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph -->
  <meta property="og:locale" content="id_ID" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- Fonts via Astro Fonts API -->
  <Font cssVariable="--font-body" preload />
  <Font cssVariable="--font-display" preload />
  <Font cssVariable="--font-mono" />

  <!-- JSON-LD -->
  {jsonLdSchemas.map((schema) => (
    <script type="application/ld+json" set:html={JSON.stringify(schema)} />
  ))}
</head>
<body>
  <!-- Skip to main content (a11y) -->
  <a href="#main" class="skip-link" style="position:absolute;left:-9999px;top:0;z-index:999;padding:8px 16px;background:var(--color-orange);color:white;font-weight:700;border-radius:0 0 8px 0;">
    Lewati navigasi
  </a>

  <slot />
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout with SEO meta, JSON-LD, Astro Fonts, skip link"
```

---

## Task 11: Nav Component

**Files:** Create `jagatrip-web/src/components/layout/Nav.astro`

- [ ] **Step 1: Write Nav.astro**

```astro
---
// jagatrip-web/src/components/layout/Nav.astro
import Logo from '../brand/Logo.astro';
---
<nav class="nav" role="navigation" aria-label="Navigasi utama">
  <div class="nav-inner">
    <a href="#" class="logo" aria-label="JAGATRIP — Beranda">
      <Logo size={32} />
      jagatrip
    </a>
    <a href="#kontak" class="nav-cta">Konsultasi Gratis →</a>
  </div>
</nav>
```

- [ ] **Step 2: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/components/layout/Nav.astro
git commit -m "feat: add Nav component (sticky + backdrop blur)"
```

---

## Task 12: Footer + FloatingWA

**Files:** Create `jagatrip-web/src/components/layout/Footer.astro` and `FloatingWA.astro`

- [ ] **Step 1: Write Footer.astro**

```astro
---
// jagatrip-web/src/components/layout/Footer.astro
import Logo from '../brand/Logo.astro';
import { site } from '../../data/site';
---
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#" class="logo" style="color: white;" aria-label="JAGATRIP">
          <Logo size={32} color="white" />
          jagatrip
        </a>
        <p>
          {site.legalName}<br />
          Edutrip Specialist sejak {site.foundingDate}.<br />
          Membuka jendela dunia melalui pendidikan, dari Indonesia untuk peradaban global.
        </p>
      </div>

      <div>
        <h4>Layanan</h4>
        <ul>
          <li><a href="#">Edutrip Internasional</a></li>
          <li><a href="#">Study Tour Sekolah</a></li>
          <li><a href="#">Cultural Exchange</a></li>
          <li><a href="#">Campus Visit</a></li>
        </ul>
      </div>

      <div>
        <h4>Perusahaan</h4>
        <ul>
          <li><a href="#">Tentang Kami</a></li>
          <li><a href="#">Visi & Misi</a></li>
          <li><a href="#">Karir</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>

      <div>
        <h4>Kontak</h4>
        <ul>
          <li>📞 {site.phone}</li>
          <li>✉️ {site.email}</li>
          <li>🌐 jagatrip.com</li>
          <li>📍 {site.address.city}, {site.address.country}</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div>© {site.foundingDate} {site.legalName}. All rights reserved.</div>
      <div>Privacy · Terms · Cookies</div>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Write FloatingWA.astro**

```astro
---
// jagatrip-web/src/components/layout/FloatingWA.astro
import { site } from '../../data/site';
---
<a
  href={site.waLink}
  class="float-wa"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat via WhatsApp"
>
  💬
</a>
```

- [ ] **Step 3: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/components/layout/
git commit -m "feat: add Footer and FloatingWA components"
```

---

## Task 13: UI Primitives

**Files:** Create 5 files in `jagatrip-web/src/components/ui/`

- [ ] **Step 1: Write Button.astro**

```astro
---
// jagatrip-web/src/components/ui/Button.astro
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary';
  class?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
}
const { href, variant = 'primary', class: cn = '', target, rel, type = 'button' } = Astro.props;
const cls = `btn-${variant} ${cn}`;
---
{href ? (
  <a href={href} class={cls} target={target} rel={rel}><slot /></a>
) : (
  <button type={type} class={cls}><slot /></button>
)}
```

- [ ] **Step 2: Write Eyebrow.astro**

```astro
---
// jagatrip-web/src/components/ui/Eyebrow.astro
interface Props { class?: string; }
const { class: cn = '' } = Astro.props;
---
<div class={`section-eyebrow ${cn}`}><slot /></div>
```

- [ ] **Step 3: Write SectionTitle.astro**

```astro
---
// jagatrip-web/src/components/ui/SectionTitle.astro
interface Props { class?: string; id?: string; }
const { class: cn = '', id } = Astro.props;
---
<h2 class={`section-title ${cn}`} id={id}><slot /></h2>
```

- [ ] **Step 4: Write HeroBadge.astro**

```astro
---
// jagatrip-web/src/components/ui/HeroBadge.astro
interface Props { style?: string; }
const { style = '' } = Astro.props;
---
<div class="hero-badge" style={style}>
  <span class="dot" aria-hidden="true"></span>
  <slot />
</div>
```

- [ ] **Step 5: Write TrustItem.astro**

```astro
---
// jagatrip-web/src/components/ui/TrustItem.astro
---
<div class="trust-item">
  <div class="trust-icon" aria-hidden="true">✓</div>
  <slot />
</div>
```

- [ ] **Step 6: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/components/ui/
git commit -m "feat: add UI primitives (Button, Eyebrow, SectionTitle, HeroBadge, TrustItem)"
```

---

## Task 14: Lib Scripts

**Files:** Create 3 files in `jagatrip-web/src/lib/`

- [ ] **Step 1: Write faq-toggle.ts**

```typescript
// jagatrip-web/src/lib/faq-toggle.ts
export function initFaqToggle(): void {
  const items = document.querySelectorAll<HTMLElement>('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>('.faq-question');
    const answer = item.querySelector<HTMLElement>('.faq-answer');
    if (!btn || !answer) return;

    btn.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    btn.setAttribute('aria-controls', answer.id || '');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
}
```

- [ ] **Step 2: Write countdown.ts**

Target date: 14 days from 2026-05-02 = 2026-05-16T23:59:59+07:00

```typescript
// jagatrip-web/src/lib/countdown.ts
const TARGET = new Date('2026-05-16T23:59:59+07:00').getTime();

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function initCountdown(): void {
  const days = document.getElementById('cd-days');
  const hours = document.getElementById('cd-hours');
  const mins = document.getElementById('cd-mins');
  const secs = document.getElementById('cd-secs');
  if (!days || !hours || !mins || !secs) return;

  function tick(): void {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      days.textContent = '00';
      hours.textContent = '00';
      mins.textContent = '00';
      secs.textContent = '00';
      return;
    }
    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    days.textContent = pad(d);
    hours.textContent = pad(h);
    mins.textContent = pad(m);
    secs.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
}
```

- [ ] **Step 3: Write form-handler.ts**

```typescript
// jagatrip-web/src/lib/form-handler.ts
export function initFormHandler(): void {
  const waNumber = import.meta.env.PUBLIC_WA_NUMBER ?? '6281234567890';
  const form = document.getElementById('konsultasi-form') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nama = data.get('nama') as string;
    const sekolah = data.get('sekolah') as string;
    const wa = data.get('wa') as string;
    const negara = data.get('negara') as string;
    const peserta = data.get('peserta') as string;

    const msg = encodeURIComponent(
      `Halo JAGATRIP! Saya ingin konsultasi edutrip:\n\n` +
      `Nama: ${nama}\nSekolah/Instansi: ${sekolah}\nNo. WA: ${wa}\n` +
      `Negara Tujuan: ${negara}\nEstimasi Peserta: ${peserta}\n\nMohon informasinya. Terima kasih!`
    );
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  });
}
```

- [ ] **Step 4: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/lib/
git commit -m "feat: add faq-toggle, countdown, and form-handler scripts"
```

---

## Task 15: Public Files + Foundation Build Check

**Files:** Create `public/favicon.svg`, `public/robots.txt`, `public/llms.txt`

- [ ] **Step 1: Write public/favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36">
  <path d="M16 0 L32 6 L32 22 Q32 32 16 36 Q0 32 0 22 L0 6 Z" fill="#FF6B35"/>
  <circle cx="16" cy="13" r="4" fill="white"/>
  <path d="M9 18 a7 4 0 0 1 14 0 L23 26 L9 26 Z" fill="white"/>
</svg>
```

- [ ] **Step 2: Write public/robots.txt**

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: https://jagatrip.com/sitemap-index.xml
```

- [ ] **Step 3: Write public/llms.txt**

```
# JAGATRIP

> Mitra edutrip internasional terpercaya untuk sekolah & kampus Indonesia.

PT JAGATRIP MITRA EDUKASI adalah penyelenggara edutrip internasional berbasis pendidikan (education-first, not travel-first). Berdiri 2026, berbasis di Jakarta.

## Layanan

- Edutrip internasional ke 8 negara: Jepang, Korea Selatan, Singapura, Malaysia, Australia, Turki, Mesir, Arab Saudi
- Itinerary kurikulum-aligned
- Tour leader bersertifikat HPI
- Asuransi internasional 100% peserta
- Makanan halal & jadwal ibadah terjamin
- Laporan harian ke orang tua

## Statistik

- 7+ negara tujuan
- 500+ siswa per tahun
- 50+ sekolah mitra
- 100% safety record

## Kontak

- WhatsApp: +62 812-3456-7890
- Email: info@jagatrip.com
- Website: https://jagatrip.com
```

- [ ] **Step 4: Update index.astro temporarily to import BaseLayout (verify foundation compiles)**

```astro
---
// jagatrip-web/src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/layout/Nav.astro';
import Footer from '../components/layout/Footer.astro';
import FloatingWA from '../components/layout/FloatingWA.astro';
---
<BaseLayout>
  <Nav />
  <main id="main">
    <p style="padding: 100px 24px; text-align: center;">Foundation check</p>
  </main>
  <Footer />
  <FloatingWA />
</BaseLayout>
```

- [ ] **Step 5: Run full foundation build check**

```bash
cd jagatrip-web
bun run build 2>&1
```

Expected: Zero errors. If Font import fails, check Astro 6 docs for correct import path — may need `import { Font } from 'astro/components'` instead.

```bash
bun run astro check 2>&1
```

Expected: Zero TypeScript errors.

- [ ] **Step 6: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/public/ jagatrip-web/src/pages/index.astro
git commit -m "feat: add public files (favicon, robots.txt, llms.txt) + foundation build check"
```

---

## ⚡ PARALLEL PHASE — Tasks 16–19 run simultaneously in 4 independent agents

Each agent receives: the full working directory `/home/ekalliptus/dev/jagatripid/jagatrip-web/`, all foundation files from Tasks 1–15, and their specific task below. Each agent commits independently.

---

## Task 16 [PARALLEL-1]: Hero + LogoBar + Stats

**Files:** 3 section components

- [ ] **Step 1: Write Hero.astro**

```astro
---
// src/components/sections/Hero.astro
import HeroBadge from '../ui/HeroBadge.astro';
import TrustItem from '../ui/TrustItem.astro';
---
<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <!-- LEFT COLUMN -->
      <div class="hero-content">
        <HeroBadge>
          Pendaftaran Edutrip 2026 Sekarang Dibuka
        </HeroBadge>

        <h1>
          Buka Jendela <span class="highlight">Dunia</span> untuk Generasi Indonesia.
        </h1>

        <p class="lead">
          Kami antar siswa & mahasiswa Anda menjelajah dunia dengan aman, belajar dari setiap perjalanan, dan kembali sebagai pribadi yang lebih kaya wawasan, karakter, dan kontribusi bagi bangsa.
        </p>

        <div class="hero-cta-group">
          <a href="#kontak" class="btn-primary">Konsultasi Gratis Sekarang →</a>
          <a href="#paket" class="btn-secondary">Lihat Paket Edutrip</a>
        </div>

        <div class="hero-trust" role="list">
          <TrustItem>Tour Leader Bersertifikat</TrustItem>
          <TrustItem>Asuransi 100% Peserta</TrustItem>
          <TrustItem>Kurikulum-Aligned</TrustItem>
        </div>
      </div>

      <!-- RIGHT COLUMN — 3-card stack -->
      <div class="hero-visual" aria-hidden="true">
        <!-- Card 1: orange gradient, top-left -->
        <div class="hero-card hero-card-1">
          <div>
            <div class="duration">Edutrip · 7 Hari</div>
            <div class="country">Tokyo</div>
          </div>
          <div>
            <div class="price-label">Mulai dari</div>
            <div class="price">Rp 18.5 jt</div>
          </div>
        </div>

        <!-- Card 3: white, top-right -->
        <div class="hero-card hero-card-3">
          <div class="stars">★★★★★</div>
          <div class="review">"Anak saya pulang dengan pribadi yang berbeda. Lebih mandiri, lebih percaya diri."</div>
          <div class="reviewer">— Ibu Sari, Orang Tua Peserta</div>
        </div>

        <!-- Card 2: white, bottom-left -->
        <div class="hero-card hero-card-2">
          <div class="avatar-stack" aria-hidden="true">
            <div class="avatar">A</div>
            <div class="avatar">R</div>
            <div class="avatar">M</div>
            <div class="avatar">+</div>
          </div>
          <div class="hero-card-2-text">
            <strong>500+ Siswa Berangkat</strong>
            <span>Tahun ini bersama JAGATRIP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Write LogoBar.astro**

```astro
---
// src/components/sections/LogoBar.astro
import partners from '../../content/partners.json';
---
<section class="logo-bar" aria-label="Mitra sekolah dan kampus">
  <div class="container">
    <p class="logo-bar-title">— Dipercaya oleh Sekolah & Kampus Indonesia —</p>
    <div class="logo-bar-grid">
      {partners.map((name) => (
        <div class="logo-bar-item">{name}</div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Write Stats.astro**

```astro
---
// src/components/sections/Stats.astro
import stats from '../../content/stats.json';
---
<section class="stats-section" aria-label="Statistik JAGATRIP">
  <div class="container">
    <div class="stats-grid">
      {stats.map((stat) => (
        <div class="stat">
          <div class="stat-num">{stat.num}</div>
          <div class="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/components/sections/Hero.astro
git add jagatrip-web/src/components/sections/LogoBar.astro
git add jagatrip-web/src/components/sections/Stats.astro
git commit -m "feat: add Hero, LogoBar, Stats sections"
```

---

## Task 17 [PARALLEL-2]: Problem + Solution + Comparison

- [ ] **Step 1: Write Problem.astro**

```astro
---
// src/components/sections/Problem.astro
import Eyebrow from '../ui/Eyebrow.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import problems from '../../content/problems.json';
---
<section class="section problem-section" aria-labelledby="problem-title">
  <div class="container">
    <div class="section-header">
      <Eyebrow>Masalahnya</Eyebrow>
      <SectionTitle id="problem-title">
        Mengantar siswa ke luar negeri itu <span class="italic">tidak sederhana.</span>
      </SectionTitle>
      <p class="section-desc">Banyak sekolah ingin memberi pengalaman global pada siswanya — tapi terbentur 3 hal ini:</p>
    </div>

    <div class="problem-grid">
      {problems.map((p) => (
        <div class="problem-card">
          <div class="problem-icon" aria-hidden="true">{p.icon}</div>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Write Solution.astro**

```astro
---
// src/components/sections/Solution.astro
import Eyebrow from '../ui/Eyebrow.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import solutions from '../../content/solutions.json';
---
<section class="section" aria-labelledby="solution-title">
  <div class="container">
    <div class="section-header">
      <Eyebrow>Solusinya</Eyebrow>
      <SectionTitle id="solution-title">
        Inilah cara <span class="italic">JAGATRIP berbeda.</span>
      </SectionTitle>
      <p class="section-desc">Kami bukan travel agent yang menambahkan elemen edukasi. Kami adalah mitra edukasi yang menggunakan travel sebagai metode pembelajaran.</p>
    </div>

    <div class="solution-grid">
      {solutions.map((sol) => (
        <div class="solution-card">
          <div class="solution-num" aria-hidden="true">{sol.num}</div>
          <h3>{sol.title}</h3>
          <p>{sol.desc}</p>
          <ul class="solution-features">
            {sol.features.map((f) => <li>{f}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Write Comparison.astro**

```astro
---
// src/components/sections/Comparison.astro
import Eyebrow from '../ui/Eyebrow.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import rows from '../../content/comparison.json';
---
<section class="section" aria-labelledby="comparison-title">
  <div class="container">
    <div class="section-header">
      <Eyebrow>Bandingkan</Eyebrow>
      <SectionTitle id="comparison-title">
        JAGATRIP vs <span class="italic">Travel Biasa.</span>
      </SectionTitle>
      <p class="section-desc">Lihat sendiri kenapa 50+ sekolah memilih JAGATRIP untuk edutrip mereka.</p>
    </div>

    <div class="comparison-table" role="table" aria-label="Perbandingan JAGATRIP vs Travel Biasa">
      <div class="comp-row header" role="row">
        <div class="comp-cell" role="columnheader">Aspek</div>
        <div class="comp-cell" role="columnheader">Travel Biasa</div>
        <div class="comp-cell highlight" role="columnheader">JAGATRIP</div>
      </div>
      {rows.map((row) => (
        <div class="comp-row" role="row">
          <div class="comp-cell" role="cell"><strong>{row.aspect}</strong></div>
          <div class="comp-cell" role="cell"><span class="x">✗</span> {row.competitor}</div>
          <div class="comp-cell highlight" role="cell"><span class="check">✓</span> {row.jagatrip}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/components/sections/Problem.astro
git add jagatrip-web/src/components/sections/Solution.astro
git add jagatrip-web/src/components/sections/Comparison.astro
git commit -m "feat: add Problem, Solution, Comparison sections"
```

---

## Task 18 [PARALLEL-3]: Destinations + Testimonials + Process

- [ ] **Step 1: Write Destinations.astro**

```astro
---
// src/components/sections/Destinations.astro
import Eyebrow from '../ui/Eyebrow.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import destinations from '../../content/destinations.json';
---
<section class="section destinations-section" id="paket" aria-labelledby="dest-title">
  <div class="container">
    <div class="section-header">
      <Eyebrow>Destinasi Edutrip</Eyebrow>
      <SectionTitle id="dest-title">
        Dunia adalah <span class="italic">ruang kelas terbesar.</span>
      </SectionTitle>
      <p class="section-desc">Kami siapkan kunjungan pendidikan ke 7 negara dengan kurikulum yang berbeda untuk tiap destinasi.</p>
    </div>

    <div class="dest-grid">
      {destinations.map((dest) => (
        <div class={`dest-card ${dest.cardClass}`}>
          <div class="dest-flag" aria-hidden="true">{dest.flag}</div>
          <div class="dest-content">
            <h3>{dest.name}</h3>
            <p>{dest.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Write Testimonials.astro**

```astro
---
// src/components/sections/Testimonials.astro
import Eyebrow from '../ui/Eyebrow.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import testimonials from '../../content/testimonials.json';
---
<section class="section" style="background: var(--color-paper);" aria-labelledby="testi-title">
  <div class="container">
    <div class="section-header">
      <Eyebrow>Yang Mereka Katakan</Eyebrow>
      <SectionTitle id="testi-title">
        Lebih dari sekadar liburan — ini <span class="italic">pengalaman yang mengubah hidup.</span>
      </SectionTitle>
    </div>

    <div class="testimonials-grid">
      {testimonials.map((t) => (
        <div class="testimonial">
          <div class="testimonial-stars" aria-label={`${t.stars} bintang`}>
            {'★'.repeat(t.stars)}
          </div>
          <blockquote class="testimonial-text">{t.text}</blockquote>
          <div class="testimonial-author">
            <div class="testimonial-avatar" aria-hidden="true">{t.initials}</div>
            <div class="testimonial-author-info">
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Write Process.astro**

```astro
---
// src/components/sections/Process.astro
import Eyebrow from '../ui/Eyebrow.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import steps from '../../content/process.json';
---
<section class="section process-section" aria-labelledby="process-title">
  <div class="container">
    <div class="section-header">
      <Eyebrow>Cara Kerja Kami</Eyebrow>
      <SectionTitle id="process-title">
        5 Tahap, <span class="italic">1 Pengalaman Tak Terlupakan.</span>
      </SectionTitle>
      <p class="section-desc">Setiap perjalanan JAGATRIP dirancang dengan metodologi 5 tahap yang teruji.</p>
    </div>

    <div class="process-grid">
      {steps.map((step) => (
        <div class="process-step">
          <div class="process-num" aria-hidden="true">{step.num}</div>
          <h4>{step.title}</h4>
          <p>{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/components/sections/Destinations.astro
git add jagatrip-web/src/components/sections/Testimonials.astro
git add jagatrip-web/src/components/sections/Process.astro
git commit -m "feat: add Destinations, Testimonials, Process sections"
```

---

## Task 19 [PARALLEL-4]: UrgencyCta + Faq + FinalCta

- [ ] **Step 1: Write UrgencyCta.astro**

```astro
---
// src/components/sections/UrgencyCta.astro
import HeroBadge from '../ui/HeroBadge.astro';
---
<section class="urgency-section" id="kontak" aria-labelledby="urgency-title">
  <div class="container">
    <div class="urgency-grid">
      <!-- LEFT: badge, heading, countdown, bonuses -->
      <div>
        <HeroBadge style="background: rgba(255,255,255,0.2); color: white;">
          Penawaran Terbatas Pendaftaran 2026
        </HeroBadge>

        <h2 id="urgency-title">
          Early Bird Discount: <span class="italic">Hemat 15%</span>
        </h2>

        <p>
          Sekolah yang mendaftar sebelum tanggal cutoff dapat early bird discount + bonus 1 free seat untuk guru pendamping. Jangan lewatkan kesempatan ini.
        </p>

        <div class="countdown" role="timer" aria-label="Hitung mundur penawaran">
          <div class="countdown-item">
            <div class="countdown-num" id="cd-days">14</div>
            <div class="countdown-label">Hari</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-num" id="cd-hours">08</div>
            <div class="countdown-label">Jam</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-num" id="cd-mins">42</div>
            <div class="countdown-label">Menit</div>
          </div>
          <div class="countdown-item">
            <div class="countdown-num" id="cd-secs">15</div>
            <div class="countdown-label">Detik</div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; align-items: center; font-size: 14px; flex-wrap: wrap;">
          <span style="background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 100px; font-weight: 600;">
            <span aria-hidden="true">🎁</span> Bonus Goody Bag Lengkap
          </span>
          <span style="background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 100px; font-weight: 600;">
            <span aria-hidden="true">📜</span> Sertifikat Resmi
          </span>
        </div>
      </div>

      <!-- RIGHT: form card -->
      <div class="urgency-form">
        <div class="form-title">Konsultasi Gratis Sekarang</div>
        <p class="form-subtitle">Tim kami akan menghubungi Anda dalam 1×24 jam.</p>

        <form id="konsultasi-form" novalidate>
          <div class="form-group">
            <label for="f-nama" class="sr-only">Nama Lengkap</label>
            <input id="f-nama" name="nama" type="text" placeholder="Nama Lengkap*" required />
          </div>
          <div class="form-group">
            <label for="f-sekolah" class="sr-only">Nama Sekolah/Instansi</label>
            <input id="f-sekolah" name="sekolah" type="text" placeholder="Nama Sekolah/Instansi*" required />
          </div>
          <div class="form-group">
            <label for="f-wa" class="sr-only">No. WhatsApp</label>
            <input id="f-wa" name="wa" type="tel" placeholder="No. WhatsApp*" required />
          </div>
          <div class="form-group">
            <label for="f-negara" class="sr-only">Negara Tujuan</label>
            <select id="f-negara" name="negara" required>
              <option value="">Negara Tujuan*</option>
              <option>Jepang</option>
              <option>Korea Selatan</option>
              <option>Singapura</option>
              <option>Malaysia</option>
              <option>Australia</option>
              <option>Turki</option>
              <option>Mesir</option>
              <option>Saudi Arabia</option>
              <option>Belum Pasti</option>
            </select>
          </div>
          <div class="form-group">
            <label for="f-peserta" class="sr-only">Estimasi Jumlah Peserta</label>
            <select id="f-peserta" name="peserta" required>
              <option value="">Estimasi Jumlah Peserta*</option>
              <option>10-20 orang</option>
              <option>21-50 orang</option>
              <option>51-100 orang</option>
              <option>100+ orang</option>
            </select>
          </div>
          <button type="submit" class="form-cta">Dapatkan Penawaran Khusus →</button>
        </form>
        <p class="form-disclaimer">🔒 Data Anda aman. Tidak ada spam.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); white-space: nowrap; border-width: 0;
  }
</style>

<script>
  import { initCountdown } from '../../lib/countdown';
  import { initFormHandler } from '../../lib/form-handler';
  initCountdown();
  initFormHandler();
</script>
```

- [ ] **Step 2: Write Faq.astro**

```astro
---
// src/components/sections/Faq.astro
import Eyebrow from '../ui/Eyebrow.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import faqs from '../../content/faqs.json';
---
<section class="section" aria-labelledby="faq-title">
  <div class="container">
    <div class="section-header">
      <Eyebrow>Pertanyaan Umum</Eyebrow>
      <SectionTitle id="faq-title">
        Yang sering ditanyakan <span class="italic">kepala sekolah & orang tua.</span>
      </SectionTitle>
    </div>

    <div class="faq-list">
      {faqs.map((faq, i) => (
        <div class={`faq-item${faq.open ? ' open' : ''}`}>
          <button
            class="faq-question"
            aria-expanded={faq.open ? 'true' : 'false'}
            aria-controls={`faq-answer-${i}`}
          >
            {faq.q}
          </button>
          <div
            id={`faq-answer-${i}`}
            class="faq-answer"
            role="region"
            aria-labelledby={`faq-q-${i}`}
          >
            {faq.a}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  import { initFaqToggle } from '../../lib/faq-toggle';
  initFaqToggle();
</script>
```

- [ ] **Step 3: Write FinalCta.astro**

```astro
---
// src/components/sections/FinalCta.astro
import { site } from '../../data/site';
---
<section class="final-cta" aria-labelledby="final-cta-title">
  <div class="container">
    <div class="final-cta-content">
      <h2 id="final-cta-title">
        Siap membuka <span class="italic">jendela dunia</span> untuk siswa Anda?
      </h2>
      <p>Konsultasi gratis. Tanpa komitmen. Tim kami siap merancang edutrip yang sesuai visi sekolah Anda.</p>
      <a
        href="#kontak"
        class="btn-primary"
        style="font-size: 18px; padding: 20px 40px;"
      >
        Mulai Konsultasi Gratis Sekarang →
      </a>
      <p style="margin-top: 24px; font-size: 14px; opacity: 0.6;">
        Atau hubungi kami: 📞 {site.phone} · ✉️ {site.email}
      </p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/components/sections/UrgencyCta.astro
git add jagatrip-web/src/components/sections/Faq.astro
git add jagatrip-web/src/components/sections/FinalCta.astro
git commit -m "feat: add UrgencyCta (countdown+form), Faq accordion, FinalCta sections"
```

---

## Task 20: Page Composition

**Files:** Overwrite `jagatrip-web/src/pages/index.astro`, create `src/pages/404.astro`

- [ ] **Step 1: Write index.astro** (compose all 12 sections in correct order)

```astro
---
// jagatrip-web/src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/layout/Nav.astro';
import Footer from '../components/layout/Footer.astro';
import FloatingWA from '../components/layout/FloatingWA.astro';

import Hero from '../components/sections/Hero.astro';
import LogoBar from '../components/sections/LogoBar.astro';
import Problem from '../components/sections/Problem.astro';
import Solution from '../components/sections/Solution.astro';
import Stats from '../components/sections/Stats.astro';
import Destinations from '../components/sections/Destinations.astro';
import Comparison from '../components/sections/Comparison.astro';
import Testimonials from '../components/sections/Testimonials.astro';
import Process from '../components/sections/Process.astro';
import UrgencyCta from '../components/sections/UrgencyCta.astro';
import Faq from '../components/sections/Faq.astro';
import FinalCta from '../components/sections/FinalCta.astro';
---
<BaseLayout>
  <Nav />
  <main id="main">
    <Hero />
    <LogoBar />
    <Problem />
    <Solution />
    <Stats />
    <Destinations />
    <Comparison />
    <Testimonials />
    <Process />
    <UrgencyCta />
    <Faq />
    <FinalCta />
  </main>
  <Footer />
  <FloatingWA />
</BaseLayout>
```

- [ ] **Step 2: Write 404.astro**

```astro
---
// jagatrip-web/src/pages/404.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/layout/Nav.astro';
import Footer from '../components/layout/Footer.astro';
---
<BaseLayout title="404 — Halaman Tidak Ditemukan | JAGATRIP">
  <Nav />
  <main id="main" style="min-height: 60vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 60px 24px;">
    <div>
      <div style="font-family: var(--font-display), 'Fraunces', serif; font-size: 120px; font-weight: 900; font-style: italic; color: var(--color-orange); line-height: 1;">404</div>
      <h1 style="font-family: var(--font-display), 'Fraunces', serif; font-size: 32px; font-weight: 800; margin-bottom: 16px;">Halaman tidak ditemukan</h1>
      <p style="color: var(--color-grey); margin-bottom: 32px;">Halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <a href="/" class="btn-primary">← Kembali ke Beranda</a>
    </div>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add jagatrip-web/src/pages/
git commit -m "feat: compose index.astro with all 12 sections + add 404.astro"
```

---

## Task 21: Final Build Verification

- [ ] **Step 1: Run full build**

```bash
cd jagatrip-web
bun run build 2>&1
```

Expected: `dist/` generated, zero errors, zero warnings.

- [ ] **Step 2: Run TypeScript check**

```bash
bun run astro check 2>&1
```

Expected: Zero errors.

- [ ] **Step 3: Preview and open browser**

```bash
bun run preview &
```

Then open `http://localhost:4321` in browser. Verify side-by-side with `jagatrip.html` opened directly.

**Visual checklist:**
- [ ] Hero h1 "Dunia" italic + orange underline visible
- [ ] Section eyebrows in JetBrains Mono, orange, uppercase
- [ ] Section titles in Fraunces 800, italic accent words in orange
- [ ] Stat numbers Fraunces 900 italic, 64px
- [ ] Solution numbers 01/02/03 Fraunces 900 italic, 80px, orange-light
- [ ] Hero badge pulse dot animating
- [ ] Solution card hover: top bar slides in from left
- [ ] FAQ first item open, `+` rotates on click
- [ ] Countdown counting down live
- [ ] Form submit opens WhatsApp
- [ ] Floating WA scales on hover
- [ ] Mobile at 375px: all grids collapse to 1-col

- [ ] **Step 4: Final commit**

```bash
cd /home/ekalliptus/dev/jagatripid
git add -A
git commit -m "feat: JAGATRIP website complete — Astro 6 + Bun + Tailwind v4"
```

# SUPERPROMPT — Implementasi Website JAGATRIP (Astro 6 + Bun)

> Paste prompt ini ke coding agent (Claude Code, Cursor, Copilot Workspace, Aider). Lampirkan file `remixed-b783e31a.html` (handoff design). **Jangan dipotong** — semua section saling terkait. Tampilan akhir wajib **PERSIS 1:1** sama design source: jenis font, weight, italic, letter-spacing, semua effect (hover, transition, gradient, blur, clip-path, animation), spacing, dan sequence.

---

## 1. ROLE & MISSION

Lo bertindak sebagai **Senior Fullstack Engineer + UI Engineer**. Misi: meng-implementasi handoff design (single HTML prototype) menjadi **website production-grade** menggunakan **Astro 6 (latest stable)** dengan runtime + package manager **Bun**.

**Constraint utama**: Tampilan akhir **HARUS PIXEL-PERFECT IDENTIK** dengan source HTML. Itu artinya:
- ✅ Setiap font family wajib sama (`Plus Jakarta Sans`, `Fraunces`, `JetBrains Mono`)
- ✅ Setiap font-weight wajib sama (400, 500, 600, 700, 800, **900** untuk Fraunces)
- ✅ Setiap `font-style: italic` wajib di-preserve (terutama di Fraunces accent words)
- ✅ Setiap `letter-spacing` wajib sama persis (`-2px`, `-1.5px`, `-0.5px`, `0.5px`, `1px`, `1.5px`, `2px`, `3px`, `4px`)
- ✅ Setiap effect/animation wajib di-port (pulse dot, hover lifts, transform translateY, scaleX bar, backdrop blur, gradient radial circles, clip-path logo)
- ✅ Setiap shadow + gradient wajib persis (rgba values, percentages, angles)
- ✅ Setiap responsive breakpoint wajib sama (`@media (max-width: 968px)`)

Output harus production-ready: type-safe, accessible (WCAG AA), SEO-optimized, Lighthouse Performance ≥ 95, dengan output minimal JS (default static).

---

## 2. PROJECT CONTEXT — JAGATRIP

| Field | Value |
|---|---|
| Brand | JAGATRIP (PT JAGATRIP MITRA EDUKASI) |
| Tagline | "Buka Jendela Dunia untuk Generasi Indonesia" |
| Niche | Edutrip internasional untuk sekolah (SMA/SMP) & kampus Indonesia |
| Differentiator | "Education-First, Not Travel-First" — mitra edukasi yang menggunakan travel sebagai metode pembelajaran |
| Bahasa | Indonesia (`lang="id"`) |
| Phone | +62 812-3456-7890 |
| WhatsApp | `6281234567890` (sama dengan phone) |
| Email | info@jagatrip.com |
| Domain | jagatrip.com |
| Lokasi | Jakarta, Indonesia |
| Sejak | 2026 |
| Tone | Profesional, premium, terpercaya — fokus aman & edukatif |

**Stats yang muncul**: 7+ negara, 500+ siswa tahun ini, 50+ sekolah mitra, 100% safety record.

**8 destinasi**: Jepang 🇯🇵, Korea 🇰🇷, Singapura 🇸🇬, Malaysia 🇲🇾, Australia 🇦🇺, Turki 🇹🇷, Mesir 🇪🇬, Arab Saudi 🇸🇦.

**Trust signals**: Tour Leader Bersertifikat HPI, Asuransi 100% Peserta, Kurikulum-Aligned, Halal & Ibadah Terjamin.

---

## 3. TECH STACK (WAJIB)

| Layer | Pilihan | Versi minimum | Alasan |
|---|---|---|---|
| Framework | **Astro** | `^6.1.0` | Static-first, output minimal JS |
| Runtime/PM | **Bun** | `>=1.1.0` | Fast install, native TS, dev cepet |
| Language | **TypeScript strict** | — | Type safety |
| Styling | **Tailwind CSS v4** + custom CSS layer | `^4.0.0` | Modern utility, CSS-first config (`@theme`) |
| Icons | **Inline SVG / emoji unicode** | — | Sesuai source (banyak emoji ✓ ⚠️ 📚 💸 🎁 📜 🇯🇵 etc) |
| Fonts | **Astro Fonts API v6** | — | Auto-subset + preload, anti-CLS |
| Output | `static` | — | Landing page = static, deploy ke mana aja |

**Bun usage**:
```bash
bun create astro@latest jagatrip-web -- --template minimal --typescript strict --git --install
cd jagatrip-web
bun install
bun run dev
bun run build
bun run preview
```

**Hindari (breaking changes Astro 6)**:
- ❌ `Astro.glob()` → pakai `import.meta.glob()` atau Content Collections
- ❌ React/Vue runtime di production (handoff = pure HTML/CSS, JS minimal inline)
- ❌ External font CDN runtime → gunakan Astro Fonts API yang otomatis self-host

---

## 4. DESIGN SYSTEM (PERSIS DARI SOURCE)

### 4.1 Color Tokens

```css
/* src/styles/tokens.css — port persis dari source :root */
@theme {
  --color-orange:        #FF6B35;
  --color-orange-dark:   #E85A2C;
  --color-orange-light:  #FFE4D6;

  --color-ink:           #0A0A0A;       /* primary text + dark sections */
  --color-ink-deeper:    #050505;       /* footer */
  --color-grey:          #6B7280;
  --color-grey-light:    #E5E7EB;

  --color-paper:         #FAF7F2;       /* warm cream BG (logo bar, paper sections) */
  --color-white:         #FFFFFF;
  --color-green:         #10B981;       /* pulse dot, check icons */

  /* WhatsApp button */
  --color-wa-green:      #25D366;

  /* Star yellow (testimonials) */
  --color-star:          #FBBF24;

  /* Destination card gradients (8 unique combos) */
  --grad-japan:    linear-gradient(135deg, #DC2626, #FCA5A5);
  --grad-korea:    linear-gradient(135deg, #1E40AF, #93C5FD);
  --grad-spore:    linear-gradient(135deg, #DC2626, #F87171);
  --grad-msia:     linear-gradient(135deg, #047857, #6EE7B7);
  --grad-aus:      linear-gradient(135deg, #C2410C, #FDBA74);
  --grad-turki:    linear-gradient(135deg, #1F2937, #6B7280);
  --grad-egypt:    linear-gradient(135deg, #7C2D12, #FB923C);
  --grad-saudi:    linear-gradient(135deg, #166534, #86EFAC);

  /* Avatar gradient stack (4 variations) */
  --grad-avatar-1: linear-gradient(135deg, #047857, #34D399);     /* green */
  --grad-avatar-2: linear-gradient(135deg, #1E40AF, #60A5FA);     /* blue */
  --grad-avatar-3: linear-gradient(135deg, #7C3AED, #C4B5FD);     /* purple */
  --grad-avatar-4: linear-gradient(135deg, #FF6B35, #FFB088);     /* orange (default) */

  /* Hero card primary gradient */
  --grad-hero-card: linear-gradient(135deg, #FF6B35 0%, #FF8B5A 100%);
}
```

### 4.2 Typography System (PERSIS — INI PALING PENTING)

> **WAJIB**: Setiap element harus pake font + weight + style yang TEPAT seperti tabel ini. Jangan substitusi font similar, jangan ubah weight (`900` ≠ `800`), jangan skip italic.

| Element | Font Family | Weight | Style | Size | Letter-spacing | Line-height |
|---|---|---|---|---|---|---|
| Body default | `Plus Jakarta Sans` | 400 | normal | 16px | normal | 1.6 |
| `.logo` text | `Plus Jakarta Sans` | **800** | normal | 22px | -0.5px | 1.6 |
| `.nav-cta` | `Plus Jakarta Sans` | 700 | normal | 14px | normal | 1.6 |
| `.hero-badge` | `Plus Jakarta Sans` | 600 | normal | 13px | 0.5px | 1.6 |
| **`.hero h1`** | **`Fraunces`** | **900** | normal | `clamp(40px, 6vw, 64px)` | **-2px** | 1.05 |
| **`.hero h1 .highlight`** | **`Fraunces`** | **900** | **italic** | inherit | inherit | inherit |
| `.hero p.lead` | `Plus Jakarta Sans` | 400 | normal | 19px | normal | 1.6 |
| `.btn-primary` / `.btn-secondary` | `Plus Jakarta Sans` | 700 | normal | 16px | normal | 1.6 |
| `.trust-item` | `Plus Jakarta Sans` | 600 | normal | 14px | normal | 1.6 |
| **`.hero-card-1 .country`** | **`Fraunces`** | **900** | **italic** | 32px | normal | 1.6 |
| `.hero-card-1 .duration` | `Plus Jakarta Sans` | 400 | normal | 13px | **2px** uppercase | 1.6 |
| `.hero-card-1 .price` | `Plus Jakarta Sans` | 800 | normal | 28px | normal | 1.6 |
| `.hero-card-3 .review` | `Plus Jakarta Sans` | 600 | normal | 14px | normal | 1.4 |
| `.logo-bar-title` | `Plus Jakarta Sans` | 600 | normal | 13px | **3px** uppercase | 1.6 |
| **`.logo-bar-item`** | **`Fraunces`** | 700 | normal | 18px | 1px | 1.6 |
| **`.section-eyebrow`** | **`JetBrains Mono`** | 700 | normal | 12px | **4px** uppercase | 1.6 |
| **`.section-title`** | **`Fraunces`** | **800** | normal | `clamp(36px, 5vw, 52px)` | -1.5px | 1.1 |
| **`.section-title .italic`** | **`Fraunces`** | 800 | **italic** | inherit | inherit | inherit |
| `.section-desc` | `Plus Jakarta Sans` | 400 | normal | 18px | normal | 1.6 |
| **`.solution-num`** | **`Fraunces`** | **900** | **italic** | 80px | normal | 1 |
| **`.solution-card h3`** | **`Fraunces`** | 700 | normal | 26px | -0.5px | 1.6 |
| `.solution-features li` | `Plus Jakarta Sans` | 500 | normal | 14px | normal | 1.6 |
| **`.dest-content h3`** | **`Fraunces`** | 800 | normal | 26px | -0.5px | 1.6 |
| `.dest-content p` | `Plus Jakarta Sans` | 400 | normal | 13px | normal | 1.6 |
| **`.stat-num`** | **`Fraunces`** | **900** | **italic** | 64px | normal | 1 |
| `.stat-label` | `Plus Jakarta Sans` | 600 | normal | 14px | **1.5px** uppercase | 1.6 |
| **`.testimonial-text`** | **`Fraunces`** | **500** | normal | 18px | -0.3px | 1.5 |
| `.testimonial-author-info strong` | `Plus Jakarta Sans` | 700 | normal | 15px | normal | 1.6 |
| `.process-step h4` | `Plus Jakarta Sans` | 700 | normal | 16px | normal | 1.6 |
| `.process-num` | `Plus Jakarta Sans` | 800 | normal | 18px | normal | 1 |
| `.comp-row.header` | `Plus Jakarta Sans` | 700 | normal | 14px | 1px uppercase | 1.6 |
| **`.urgency-section h2`** | **`Fraunces`** | **900** | normal | 48px | -1.5px | 1.1 |
| **`.urgency-section h2 .italic`** | **`Fraunces`** | 900 | **italic** | inherit | inherit | inherit |
| **`.countdown-num`** | **`Fraunces`** | **900** | normal | 40px | normal | 1 |
| `.countdown-label` | `Plus Jakarta Sans` | 400 | normal | 11px | **2px** uppercase | 1.6 |
| **`.form-title`** | **`Fraunces`** | 800 | normal | 26px | -0.5px | 1.6 |
| `.faq-question` | `Plus Jakarta Sans` | 700 | normal | 16px | normal | 1.6 |
| **`.final-cta h2`** | **`Fraunces`** | **900** | normal | `clamp(40px, 6vw, 64px)` | -2px | 1.1 |
| **`.final-cta h2 .italic`** | **`Fraunces`** | 900 | **italic** | inherit | inherit | inherit |
| `.footer h4` | `Plus Jakarta Sans` | 700 (implicit) | normal | 14px | **2px** uppercase | 1.6 |

**Pemakaian style guideline**:
- **`Fraunces` italic** = "accent word" — selalu dipakai di kata kunci yang dihighlight oranye di section title
- **`Fraunces` bold 900** = display headlines (h1 hero, urgency h2, final CTA h2)
- **`Fraunces` 800** = section titles
- **`Fraunces` 700** = card titles (solution, dest, form, logo-bar)
- **`Fraunces` 500** = testimonial body (untuk feel "editorial quote")
- **`JetBrains Mono` 700** = HANYA untuk `.section-eyebrow` (uppercase 4px tracking)
- **`Plus Jakarta Sans`** = SEMUA yang lain (body, button, label, paragraph, nav)

### 4.3 Astro Fonts API Setup (WAJIB)

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: 'google',
        name: 'Plus Jakarta Sans',
        cssVariable: '--font-body',
        weights: [400, 500, 600, 700, 800],
      },
      {
        provider: 'google',
        name: 'Fraunces',
        cssVariable: '--font-display',
        weights: [400, 500, 700, 900],
        styles: ['normal', 'italic'],   // CRITICAL — italic wajib
        variationSettings: { opsz: '9..144' },
      },
      {
        provider: 'google',
        name: 'JetBrains Mono',
        cssVariable: '--font-mono',
        weights: [400, 500, 700],
      },
    ],
  },
});
```

### 4.4 Spacing & Layout

```css
@theme {
  --container-max: 1200px;
  --container-padding: 24px;

  /* Section padding */
  --section-py: 100px;        /* default */
  --section-py-mobile: 60px;  /* @max-width: 968px */
  --section-py-stats: 80px;
  --section-py-final: 100px;

  /* Radius scale (port persis) */
  --radius-card: 24px;          /* hero-card, solution-card, testimonial, urgency-form */
  --radius-card-md: 20px;       /* problem-card, dest-card, process-step, countdown */
  --radius-input: 16px;         /* faq-item */
  --radius-input-sm: 12px;      /* form input/select, form-cta */
  --radius-pill: 100px;         /* btn-primary, btn-secondary, hero-badge, nav-cta, trust badges */
  --radius-icon: 16px;          /* problem-icon */
  --radius-circle: 50%;         /* trust-icon, avatar, process-num, float-wa */
}
```

### 4.5 Shadow Catalog (port persis)

```css
@theme {
  --shadow-nav-cta:       0 4px 12px rgba(255, 107, 53, 0.25);
  --shadow-btn-primary:   0 8px 24px rgba(255, 107, 53, 0.35);
  --shadow-btn-hover:     0 12px 32px rgba(255, 107, 53, 0.45);
  --shadow-hero-card:     0 20px 50px rgba(0, 0, 0, 0.10);
  --shadow-comparison:    0 20px 50px rgba(0, 0, 0, 0.06);
  --shadow-solution-hover: 0 20px 40px rgba(255, 107, 53, 0.15);
  --shadow-testi-hover:   0 20px 40px rgba(0, 0, 0, 0.08);
  --shadow-form:          0 30px 60px rgba(0, 0, 0, 0.20);
  --shadow-wa:            0 10px 30px rgba(37, 211, 102, 0.40);
}
```

---

## 5. EFFECT CATALOG (PERSIS — JANGAN SKIP)

> Setiap effect berikut wajib di-port. Lo gak boleh "menyederhanakan" atau "mengganti dengan equivalent".

### 5.1 Animations / Keyframes

```css
/* Pulse dot di hero-badge — wajib infinite loop */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}
.hero-badge .dot {
  animation: pulse 2s infinite;
}

/* Reduced motion guard */
@media (prefers-reduced-motion: reduce) {
  .hero-badge .dot { animation: none; }
}
```

### 5.2 Logo Icon (CSS clip-path — port persis)

> Logo JAGATRIP = perisai (shield) dengan dot + half-circle representasi "guardian + person". Source pakai CSS `clip-path: path()`. Port jadi **SVG component** supaya konsisten cross-browser dan accessible.

Source CSS (untuk reference):
```css
.logo-icon {
  width: 32px;
  height: 36px;
  background: var(--orange);
  clip-path: path('M16 0 L32 6 L32 22 Q32 32 16 36 Q0 32 0 22 L0 6 Z');
  position: relative;
}
.logo-icon::before {  /* head dot */
  content: '';
  position: absolute;
  top: 9px; left: 50%;
  transform: translateX(-50%);
  width: 8px; height: 8px;
  border-radius: 50%;
  background: white;
}
.logo-icon::after {   /* body half-circle */
  content: '';
  position: absolute;
  top: 18px; left: 50%;
  transform: translateX(-50%);
  width: 14px; height: 8px;
  border-radius: 50% 50% 0 0;
  background: white;
}
```

**Target Astro component** `src/components/brand/Logo.astro`:
```astro
---
interface Props { size?: number; class?: string; }
const { size = 32, class: cn = '' } = Astro.props;
const w = size, h = size * 36 / 32;  // preserve 32:36 ratio
---
<svg width={w} height={h} viewBox="0 0 32 36" xmlns="http://www.w3.org/2000/svg" class={cn} aria-label="JAGATRIP">
  <path d="M16 0 L32 6 L32 22 Q32 32 16 36 Q0 32 0 22 L0 6 Z" fill="var(--color-orange)" />
  <circle cx="16" cy="13" r="4" fill="white" />
  <path d="M9 18 a7 4 0 0 1 14 0 L23 26 L9 26 Z" fill="white" />
</svg>
```

> **PENTING**: SVG path di atas adalah representasi geometris 1:1 dari clip-path source. Visual harus identik dengan source HTML rendering. Test side-by-side.

### 5.3 Hero Card Stack (3 absolute-positioned cards)

Hero visual = 3 cards ber-overlap:
1. **`.hero-card-1`** (orange gradient, top-left, 280px tall, dengan `🗼` decorative emoji bottom-right opacity 0.15 size 200px)
2. **`.hero-card-2`** (white, bottom-left 40px, 280px wide, avatar stack + text)
3. **`.hero-card-3`** (white, top: 100px, right: 0, 240px wide, star review)

Container: `.hero-visual { position: relative; height: 540px; }`

**WAJIB di-port**: hover effect tiap card = `transform: translateY(-4px)` dengan `transition: transform 0.3s`.

### 5.4 Hero h1 Highlight Underline (signature effect)

```css
.hero h1 .highlight {
  color: var(--color-orange);
  font-style: italic;
  position: relative;
  display: inline-block;
}
.hero h1 .highlight::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0; right: 0;
  height: 8px;
  background: var(--color-orange-light);
  z-index: -1;
  border-radius: 4px;
}
```

> Effect: kata "Dunia" di hero h1 punya garis bawah orange-light tebal 8px sebagai highlight marker. WAJIB diport persis — ini signature visual brand-nya.

### 5.5 Solution Card Hover (top bar reveal)

```css
.solution-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--color-orange);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}
.solution-card:hover::before { transform: scaleX(1); }
.solution-card:hover {
  border-color: var(--color-orange);
  transform: translateY(-6px);
  box-shadow: var(--shadow-solution-hover);
}
```

### 5.6 Destination Card Overlay Gradient

```css
.dest-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%);
}
```

Tiap card pakai 1 dari 8 gradient (`--grad-japan` sampai `--grad-saudi`), overlay gradient bottom dark, content (h3, p) `position: relative; z-index: 1` dengan flag emoji top-right.

### 5.7 Stats Section Radial Glow

```css
.stats-section {
  background: linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-dark) 100%);
  position: relative;
  overflow: hidden;
}
.stats-section::before {
  content: '';
  position: absolute;
  top: -50%; left: -10%;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
}
```

### 5.8 Final CTA Radial Glow (centered)

```css
.final-cta::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 800px; height: 800px;
  background: radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 60%);
  border-radius: 50%;
}
```

### 5.9 Hero Section Decorative Glow (top-right)

```css
.hero::before {
  content: '';
  position: absolute;
  top: -100px; right: -100px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%);
  border-radius: 50%;
}
```

### 5.10 Sticky Nav Backdrop Blur

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-grey-light);
  padding: 16px 0;
}
```

> Pakai `position: sticky` (NOT fixed), dengan backdrop-filter blur 10px. Wajib persis.

### 5.11 Countdown Backdrop Blur

```css
.countdown {
  background: rgba(0,0,0,0.2);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
}
```

### 5.12 FAQ Accordion (rotating + sign)

```css
.faq-question::after {
  content: '+';
  font-size: 24px;
  color: var(--color-orange);
  transition: transform 0.2s;
  font-weight: 300;
}
.faq-item.open .faq-question::after { transform: rotate(45deg); }

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s, padding 0.3s;
  padding: 0 28px;
}
.faq-item.open .faq-answer {
  max-height: 300px;
  padding: 0 28px 22px;
}
```

JS minimal untuk toggle class `open`. **WAJIB** pakai vanilla JS (bukan React).

### 5.13 Floating WA Button Hover

```css
.float-wa:hover { transform: scale(1.1); }
```

### 5.14 Hero Decorative Tower Emoji

```css
.hero-card-1::after {
  content: '🗼';
  position: absolute;
  font-size: 200px;
  right: -40px;
  bottom: -50px;
  opacity: 0.15;
}
```

> Emoji decorative sebagai pseudo-element. WAJIB di-port persis (size 200px, opacity 0.15, positioned right -40px bottom -50px).

### 5.15 Avatar Stack (overlapping circles dengan -10px margin)

```css
.avatar-stack { display: flex; }
.avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 3px solid white;
  margin-left: -10px;        /* overlap effect */
}
.avatar:first-child { margin-left: 0; }
```

4 avatars dengan gradient masing-masing (`--grad-avatar-1` sampai `--grad-avatar-4`).

### 5.16 Smooth Scroll (HTML-level)

```css
html { scroll-behavior: smooth; }
```

Nav links pakai anchor (`#kontak`, `#paket`).

---

## 6. PROJECT STRUCTURE

```
jagatrip-web/
├── public/
│   ├── favicon.svg                        # logo SVG sebagai favicon
│   ├── og-default.png                     # 1200x630 untuk social share
│   ├── robots.txt
│   └── llms.txt                           # GEO entry point (opsional, recommended)
├── src/
│   ├── components/
│   │   ├── brand/
│   │   │   └── Logo.astro                 # SVG dari clip-path source
│   │   ├── layout/
│   │   │   ├── Nav.astro                  # sticky nav + blur
│   │   │   ├── Footer.astro
│   │   │   └── FloatingWA.astro
│   │   ├── ui/
│   │   │   ├── Button.astro               # btn-primary, btn-secondary
│   │   │   ├── Eyebrow.astro              # JetBrains Mono, uppercase 4px tracking
│   │   │   ├── SectionTitle.astro         # Fraunces 800, support .italic span
│   │   │   ├── HeroBadge.astro            # pill badge dengan pulse dot
│   │   │   └── TrustItem.astro
│   │   └── sections/
│   │       ├── Hero.astro                 # 3-card stack visual
│   │       ├── LogoBar.astro              # 6 partner logos (text-based)
│   │       ├── Problem.astro              # 3 problem cards (dark BG)
│   │       ├── Solution.astro             # 3 solution cards
│   │       ├── Stats.astro                # 4 stats (orange gradient)
│   │       ├── Destinations.astro         # 8 dest cards
│   │       ├── Comparison.astro           # 7-row comparison table
│   │       ├── Testimonials.astro         # 3 testimonials
│   │       ├── Process.astro              # 5-step (dark BG)
│   │       ├── UrgencyCta.astro           # countdown + form
│   │       ├── Faq.astro                  # 7 FAQ accordion
│   │       └── FinalCta.astro             # dark BG + centered radial glow
│   ├── content/
│   │   ├── config.ts
│   │   ├── destinations.json              # 8 destinations
│   │   ├── solutions.json                 # 3 solutions
│   │   ├── problems.json                  # 3 problems
│   │   ├── testimonials.json              # 3 testimonials
│   │   ├── process.json                   # 5 steps
│   │   ├── faqs.json                      # 7 FAQs
│   │   ├── stats.json                     # 4 stats
│   │   ├── partners.json                  # 6 logo-bar partners
│   │   └── comparison.json                # 7 comparison rows
│   ├── data/
│   │   └── site.ts                        # nama, contact, social, urls
│   ├── layouts/
│   │   └── BaseLayout.astro               # html shell + SEO + JSON-LD
│   ├── lib/
│   │   ├── seo.ts                         # JSON-LD generators
│   │   ├── faq-toggle.ts                  # vanilla accordion
│   │   ├── countdown.ts                   # countdown timer (opsional)
│   │   └── form-handler.ts                # form submit handler
│   ├── pages/
│   │   ├── index.astro                    # = handoff HTML
│   │   └── 404.astro
│   └── styles/
│       ├── global.css                     # entry: tailwind + tokens + components
│       ├── tokens.css                     # @theme blocks
│       ├── components.css                 # all .btn/.card recipes (port dari source)
│       └── animations.css                 # @keyframes + reduce-motion
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── bun.lock
├── .env.example
├── .gitignore
└── README.md
```

---

## 7. PAGE STRUCTURE — `/` (Single Landing Page)

**Source**: `remixed-b783e31a.html`. Section order **WAJIB** sama persis:

| # | Section | Component | BG Color | Special Effects |
|---|---|---|---|---|
| 0 | Sticky Nav | `Nav.astro` | white 95% + blur(10px) | sticky top, border-bottom |
| 1 | Hero | `Hero.astro` | `paper → white` linear-gradient + radial glow top-right | 3-card stack, badge dengan pulse dot, h1 highlight underline |
| 2 | Logo Bar | `LogoBar.astro` | `--color-paper` | opacity 0.6, gap 40px, 6 partner labels |
| 3 | Problem | `Problem.astro` | `--color-ink` (BLACK) | 3 cards dengan border rgba(255,255,255,0.1) |
| 4 | Solution | `Solution.astro` | `--color-white` | 3 cards dengan number 80px Fraunces italic + scaleX bar |
| 5 | Stats | `Stats.astro` | orange gradient 135deg | radial glow top-left + 4 stats Fraunces italic 64px |
| 6 | Destinations | `Destinations.astro` | `--color-paper` | 8 gradient cards + dark overlay |
| 7 | Comparison | `Comparison.astro` | `--color-white` | 7-row table, header bg paper, kolom 3 highlight orange-light |
| 8 | Testimonials | `Testimonials.astro` | `--color-paper` (inline style) | 3 cards dengan Fraunces 500 quote |
| 9 | Process | `Process.astro` | `--color-ink` (BLACK) | 5 steps grid |
| 10 | Urgency CTA | `UrgencyCta.astro` | orange gradient 135deg + radial right | countdown 4-segment + white form card |
| 11 | FAQ | `Faq.astro` | white | 7 accordion items |
| 12 | Final CTA | `FinalCta.astro` | `--color-ink` + centered orange radial glow 800px | h2 Fraunces 900 + italic accent |
| 13 | Footer | `Footer.astro` | `--color-ink-deeper` (#050505) | 4-col grid |
| 14 | Floating WA | `FloatingWA.astro` | `#25D366` | fixed bottom-right, scale 1.1 hover |

### Section detail (per-section):

#### 7.1 Nav
- Logo (icon + text "jagatrip")
- CTA pill "Konsultasi Gratis →" → `#kontak`
- **Mobile** (<968px): CTA shrink (padding 10px 18px, font 13px)

#### 7.2 Hero
- **Left col (1.1fr)**:
  - Badge: pulse green dot + "Pendaftaran Edutrip 2026 Sekarang Dibuka"
  - h1 Fraunces 900: `Buka Jendela <span class="highlight">Dunia</span> untuk Generasi Indonesia.`
  - Lead p Plus Jakarta: "Kami antar siswa & mahasiswa Anda menjelajah dunia..."
  - 2 CTA: btn-primary "Konsultasi Gratis Sekarang →" + btn-secondary "Lihat Paket Edutrip"
  - Trust row dengan 3 items: Tour Leader Bersertifikat / Asuransi 100% Peserta / Kurikulum-Aligned
- **Right col (1fr)** — `.hero-visual` height 540px:
  - Card 1 (orange gradient, top-left): "Edutrip · 7 Hari" / Tokyo (Fraunces 900 italic 32px) / "Mulai dari Rp 18.5 jt" + emoji 🗼 decorative
  - Card 3 (white, top:100px right:0, 240px wide): ★★★★★ + review quote + reviewer
  - Card 2 (white, bottom-left:40px, 280px wide): avatar stack [A, R, M, +] + "500+ Siswa Berangkat" + "Tahun ini bersama JAGATRIP"

#### 7.3 LogoBar
- "— Dipercaya oleh Sekolah & Kampus Indonesia —" (eyebrow style, 3px tracking)
- 6 partner labels (Fraunces 700, 18px, opacity 0.6): SMA AL-FATIHAH / UNIV. NUSANTARA / SMK GLOBAL / SMA RAMAH / SMP ALMADINAH / YAYASAN AIS

#### 7.4 Problem (BG black)
- Eyebrow oranye: "Masalahnya"
- h2: `Mengantar siswa ke luar negeri itu <span class="italic">tidak sederhana.</span>`
- 3 cards dengan icon emoji (⚠️, 📚, 💸):
  - "Khawatir Keselamatan"
  - "Kurang Edukatif"
  - "Harga Tidak Transparan"

#### 7.5 Solution
- Eyebrow: "Solusinya"
- h2: `Inilah cara <span class="italic">JAGATRIP berbeda.</span>`
- 3 cards dengan number 01/02/03 (Fraunces 900 italic 80px):
  - "Education-First, Not Travel-First"
  - "Indonesia Soul, Global Standard"
  - "Guardian-Level Care"
- Setiap card punya 4 features dengan ✓ orange

#### 7.6 Stats (BG orange gradient)
- 4 stats horizontal: 7+ / 500+ / 50+ / 100%
- Labels uppercase 1.5px tracking: Negara Tujuan / Siswa Tahun Ini / Sekolah Mitra / Safety Record

#### 7.7 Destinations (`#paket`)
- Eyebrow: "Destinasi Edutrip"
- h2: `Dunia adalah <span class="italic">ruang kelas terbesar.</span>`
- Grid 4-col (8 cards):
  1. 🇯🇵 Jepang — Tokyo · Kyoto · Osaka — Teknologi & Disiplin
  2. 🇰🇷 Korea Selatan — Seoul · Busan — K-Culture & Innovation
  3. 🇸🇬 Singapura — Smart City & Pendidikan Tinggi
  4. 🇲🇾 Malaysia — KL · Penang — Multicultural Hub
  5. 🇦🇺 Australia — Sydney · Melbourne — Top University
  6. 🇹🇷 Turki — Istanbul · Cappadocia — Sejarah Peradaban
  7. 🇪🇬 Mesir — Cairo · Alexandria — Cradle of Civilization
  8. 🇸🇦 Arab Saudi — Mecca · Madinah — Spiritual Journey

#### 7.8 Comparison
- Eyebrow: "Bandingkan"
- h2: `JAGATRIP vs <span class="italic">Travel Biasa.</span>`
- Table 1.5fr / 1fr / 1fr, header bg paper
- 7 rows (Itinerary / Tour Leader / Asuransi / Laporan ke Ortu / Kebutuhan Halal & Ibadah / Sertifikat & Refleksi / Transparansi Biaya)
- Kolom 3 (JAGATRIP) highlight orange-light dengan ✓ check orange

#### 7.9 Testimonials (BG paper inline)
- Eyebrow: "Yang Mereka Katakan"
- h2: `Lebih dari sekadar liburan — ini <span class="italic">pengalaman yang mengubah hidup.</span>`
- 3 testimonials dengan Fraunces 500 quote, author + role:
  - Ibu Sari Rahmawati / Orang Tua Peserta · SMA Al-Fatihah
  - Bapak H. Hidayat, M.Pd / Kepala Sekolah · SMA Ramah Indonesia
  - Ahmad Rizky, 17 / Peserta Edutrip Jepang 2026

#### 7.10 Process (BG black)
- Eyebrow: "Cara Kerja Kami"
- h2: `5 Tahap, <span class="italic">1 Pengalaman Tak Terlupakan.</span>`
- Grid 5-col, 5 steps: Konsultasi Gratis / Itinerary Custom / Pra-Keberangkatan / Perjalanan / Pasca-Trip

#### 7.11 Urgency CTA (`#kontak`, BG orange gradient)
- **Left**: badge white-translucent + h2 "Early Bird Discount: <span class='italic'>Hemat 15%</span>" + descriptive p + countdown 4-cell (Hari/Jam/Menit/Detik) + 2 bonus pills (🎁 Bonus Goody Bag + 📜 Sertifikat Resmi)
- **Right**: white form card dengan title "Konsultasi Gratis Sekarang" + 5 form fields:
  1. Nama Lengkap (text)
  2. Nama Sekolah/Instansi (text)
  3. No. WhatsApp (tel)
  4. Negara Tujuan (select 9 options)
  5. Estimasi Jumlah Peserta (select 4 options)
  - Submit button "Dapatkan Penawaran Khusus →"
  - Disclaimer "🔒 Data Anda aman. Tidak ada spam."

#### 7.12 FAQ
- Eyebrow: "Pertanyaan Umum"
- h2: `Yang sering ditanyakan <span class="italic">kepala sekolah & orang tua.</span>`
- 7 FAQ accordion items, item ke-1 default `open`:
  1. Apakah JAGATRIP punya legalitas resmi?
  2. Bagaimana sistem keamanan & asuransi peserta?
  3. Apakah makanan halal & jadwal ibadah terjamin?
  4. Berapa minimum peserta untuk paket grup?
  5. Bagaimana jika anak saya pertama kali ke luar negeri?
  6. Apakah ada sistem cicilan?
  7. Apa yang berbeda dari travel agent biasa?

#### 7.13 Final CTA (BG black + centered radial glow)
- h2: `Siap membuka <span class="italic">jendela dunia</span> untuk siswa Anda?`
- Lead p
- btn-primary big: "Mulai Konsultasi Gratis Sekarang →" (font-size 18px, padding 20px 40px)
- Contact line: "📞 +62 812-3456-7890 · ✉️ info@jagatrip.com"

#### 7.14 Footer (BG #050505)
- 4-col grid (2fr / 1fr / 1fr / 1fr):
  1. Brand: logo + "PT JAGATRIP MITRA EDUKASI / Edutrip Specialist sejak 2026 / Membuka jendela dunia melalui pendidikan, dari Indonesia untuk peradaban global."
  2. Layanan: Edutrip Internasional / Study Tour Sekolah / Cultural Exchange / Campus Visit
  3. Perusahaan: Tentang Kami / Visi & Misi / Karir / Blog
  4. Kontak: 📞 +62 812-3456-7890 / ✉️ info@jagatrip.com / 🌐 jagatrip.com / 📍 Jakarta, Indonesia
- Footer bottom: copyright + Privacy · Terms · Cookies

#### 7.15 Floating WA
- Fixed bottom 24px, right 24px
- Bg #25D366, 60×60, border-radius 50%, shadow rgba(37,211,102,0.4)
- Icon emoji 💬 (atau SVG WhatsApp)
- Hover scale(1.1)
- Link: `https://wa.me/6281234567890`

---

## 8. SOURCE FILE MAPPING

| Source `remixed-b783e31a.html` | Astro target |
|---|---|
| `<head>` meta tags | `BaseLayout.astro` props |
| `<style>` `:root` | `src/styles/tokens.css` (`@theme`) |
| `<style>` global resets | `src/styles/global.css` |
| `<style>` `.btn-primary`/`.btn-secondary`/`.nav-cta`/recipe classes | `src/styles/components.css` |
| `<style>` `@keyframes pulse` | `src/styles/animations.css` |
| `<style>` `@media (max-width: 968px)` | inline di `components.css` (Tailwind v4 native) |
| `.logo-icon` clip-path | `src/components/brand/Logo.astro` (port ke SVG) |
| `<nav>` markup | `src/components/layout/Nav.astro` |
| `<section class="hero">` | `src/components/sections/Hero.astro` |
| `<section class="logo-bar">` | `src/components/sections/LogoBar.astro` |
| `<section class="problem-section">` | `src/components/sections/Problem.astro` |
| `<section>` Solution markup | `src/components/sections/Solution.astro` |
| `<section class="stats-section">` | `src/components/sections/Stats.astro` |
| `<section id="paket">` | `src/components/sections/Destinations.astro` |
| Comparison `<section>` | `src/components/sections/Comparison.astro` |
| Testimonials `<section>` | `src/components/sections/Testimonials.astro` |
| `<section class="process-section">` | `src/components/sections/Process.astro` |
| `<section id="kontak">` | `src/components/sections/UrgencyCta.astro` |
| FAQ `<section>` | `src/components/sections/Faq.astro` (+ `lib/faq-toggle.ts`) |
| Final CTA `<section>` | `src/components/sections/FinalCta.astro` |
| `<footer>` | `src/components/layout/Footer.astro` |
| `<a class="float-wa">` | `src/components/layout/FloatingWA.astro` |
| Inline `onclick` di FAQ | `src/lib/faq-toggle.ts` (vanilla, gak boleh inline) |
| Inline `<script>` form alert | `src/lib/form-handler.ts` |

---

## 9. CRITICAL REQUIREMENTS

### 9.1 SEO (UPGRADE dari source — source minimal)

Source HTML cuma punya `<title>` + `<meta name="viewport">`. Wajib **upgrade** dengan:

**Meta tags wajib di `BaseLayout.astro`**:
- `<meta name="description">` (≤160 chars, mention edutrip + Indonesia + safety)
- `<meta name="keywords">` (edutrip, study tour, sekolah, kampus, internasional)
- `<meta name="author" content="PT JAGATRIP MITRA EDUKASI">`
- `<meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large">`
- `<meta name="theme-color" content="#FF6B35">`
- `<meta name="geo.region" content="ID">`
- `<meta name="geo.placename" content="Jakarta, Indonesia">`
- `<link rel="canonical" href="https://jagatrip.com/">`

**Open Graph + Twitter Card**:
- `og:locale="id_ID"`, `og:type="website"`, `og:title`, `og:description`, `og:url`, `og:site_name="JAGATRIP"`, `og:image` (1200×630)
- `twitter:card="summary_large_image"`

**JSON-LD wajib** (generate via `src/lib/seo.ts`, render di BaseLayout):
1. `Organization` (PT JAGATRIP MITRA EDUKASI, foundingDate 2026, contactPoint, sameAs)
2. `LocalBusiness` / `TravelAgency` (areaServed Indonesia, servesCuisine N/A, address Jakarta)
3. `Service` + `OfferCatalog` (8 destinations sebagai TouristTrip offers)
4. `WebSite` + `SearchAction`
5. `BreadcrumbList`
6. `FAQPage` (7 Qs dari section FAQ)
7. `AggregateRating` (4.9★ dari testimonial — kalau diasumsikan)

### 9.2 GEO (Optional tapi recommended)

- `public/robots.txt` allow GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended (lihat template di prompt Media Pro v2)
- `public/llms.txt` (atau `src/pages/llms.txt.ts` dynamic) dengan summary brand + key pages + 7 destinations + pricing

### 9.3 Performance (Lighthouse target ≥95)

- **Hero card-1 BG**: tidak butuh image (pure CSS gradient + emoji), zero LCP cost
- **Avatar gradients**: pure CSS, zero image
- **Destination cards**: pure CSS gradient (source juga gak punya foto)
- **Trust icons** (✓ dalam circle): inline emoji atau SVG
- **Font**: Astro Fonts API self-host + preload subset critical
- **Bundle JS budget**: ≤ 8 KB gzipped (cuma faq-toggle + form-handler + countdown opsional)
- **CSS**: critical inline default Astro

### 9.4 Accessibility (WCAG 2.1 AA)

- Skip link `<a href="#main">` ke main content
- Semantic: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`
- FAQ: `<button>` dengan `aria-expanded`, `<div role="region" aria-labelledby>`
- Floating WA: `aria-label="Chat WhatsApp"`
- Decorative emoji (🗼 di hero card, flags di dest card top-right): wrap dengan `aria-hidden="true"` kalau pure decoration
- Form: `<label>` wajib (source gak punya, **upgrade**), `aria-describedby` untuk error
- `prefers-reduced-motion`: disable `pulse` animation, `transform` hovers, smooth scroll

### 9.5 Security

- Form action: tetap pakai `e.preventDefault()` dengan custom handler. Default = WhatsApp deep link generator (zero JS server). Opsional kalau pakai Bun adapter SSR: POST ke `/api/contact` → forward ke email/Webhook.
- Floating WA + form CTA: `target="_blank"` wajib `rel="noopener noreferrer"`
- Phone/email/WA simpan di `src/data/site.ts`, jangan hardcode di markup

### 9.6 Environment Variables

`.env.example`:
```
PUBLIC_SITE_URL=https://jagatrip.com
PUBLIC_WA_NUMBER=6281234567890
PUBLIC_PHONE=+6281234567890
PUBLIC_EMAIL=info@jagatrip.com
PUBLIC_GA_ID=                   # opsional
PUBLIC_META_PIXEL_ID=           # opsional
```

`astro.config.mjs`:
```ts
env: {
  schema: {
    PUBLIC_SITE_URL:      envField.string({ context: 'client', access: 'public' }),
    PUBLIC_WA_NUMBER:     envField.string({ context: 'client', access: 'public' }),
    PUBLIC_PHONE:         envField.string({ context: 'client', access: 'public' }),
    PUBLIC_EMAIL:         envField.string({ context: 'client', access: 'public' }),
    PUBLIC_GA_ID:         envField.string({ context: 'client', access: 'public', optional: true }),
    PUBLIC_META_PIXEL_ID: envField.string({ context: 'client', access: 'public', optional: true }),
  },
},
security: { csp: true },
```

---

## 10. EXECUTION ORDER

### Phase 1 — Scaffold (~30 menit)
1. `bun create astro@latest jagatrip-web -- --template minimal --typescript strict --git --install`
2. `cd jagatrip-web && bun add tailwindcss @tailwindcss/vite`
3. `bun add -d @astrojs/sitemap @astrojs/check`
4. Konfigurasi `astro.config.mjs`: 3 fonts (Plus Jakarta + Fraunces italic + JetBrains Mono), sitemap, env, CSP
5. Folder structure sesuai section 6

### Phase 2 — Design Tokens & Components.css (~1.5 jam)
6. Port `:root` source ke `tokens.css` sebagai `@theme`
7. Port semua recipe class (`.btn`, `.section-*`, `.hero-*`, `.stat-num`, `.dest-card`, dll) ke `components.css`
8. Port `@keyframes pulse` + reduce-motion guard ke `animations.css`
9. Port `@media (max-width: 968px)` rules
10. Setup `global.css` entry: Tailwind import + tokens + components + animations
11. Test render plain page, semua tokens berfungsi, font-weight 900 italic Fraunces muncul

### Phase 3 — Foundation Components (~1.5 jam)
12. Bikin `Logo.astro` SVG component (port clip-path → SVG path)
13. Bikin `BaseLayout.astro` lengkap dengan SEO meta + 7 JSON-LD
14. Bikin `Nav.astro` (sticky + backdrop blur, mobile-aware)
15. Bikin `Footer.astro` (4-col grid, BG #050505)
16. Bikin `FloatingWA.astro`
17. Bikin UI primitives: `Button`, `Eyebrow`, `SectionTitle`, `HeroBadge`, `TrustItem`
18. Bikin lib scripts: `faq-toggle.ts`, `form-handler.ts`, optional `countdown.ts`

### Phase 4 — Content Collections (~30 menit)
19. Setup `src/content/config.ts`
20. Bikin 9 file JSON (destinations, solutions, problems, testimonials, process, faqs, stats, partners, comparison)
21. Ekstrak persis dari source HTML, jangan ngarang

### Phase 5 — Sections (~3-4 jam)
22. Bikin 12 section components (urut sesuai page order section 7)
23. Per section: visual match check side-by-side dengan source
24. **Wajib check**: setiap heading pakai font + weight + style yang TEPAT (Fraunces 900 italic, dll)
25. **Wajib check**: setiap effect ke-port (highlight underline, hover translateY, scaleX bar, radial glows, backdrop blur)

### Phase 6 — Page Composition & Polish (~1 jam)
26. Bikin `src/pages/index.astro` yang compose semua section
27. Bikin `src/pages/404.astro`
28. Lighthouse audit: target ≥95 di semua metric
29. A11y audit dengan axe-devtools
30. Test `prefers-reduced-motion` (pulse + hover hilang)
31. Test mobile (375px) + tablet (768px) + desktop (1440px)
32. **Side-by-side comparison** dengan source HTML — cek visual identik

### Phase 7 — Deployment Prep
33. Tambahin `bun.lock` ke git
34. Tulis `README.md`: cara dev/build/deploy/update content
35. Pilih deployment target — rekomendasi:
    - **Static (default)**: Netlify / Vercel / Cloudflare Pages, build `bun run build`, output `dist/`
    - **VPS dengan Nginx/Caddy**: install Bun, build, serve `dist/` + SSL
    - **Bun SSR** (kalau form perlu endpoint): install `@wyattjoh/astro-bun-adapter`, output server, jalanin via PM2

---

## 11. DELIVERABLES

1. **Repo Git** dengan struktur sesuai section 6
2. **`README.md`**: setup local, env, build, deploy, content update
3. **Lighthouse report** (mobile + desktop) untuk `/` — wajib ≥95
4. **Side-by-side screenshot**: source HTML vs Astro hasil (dekstop 1440px + mobile 375px) — semua section
5. **Font verification**: screenshot DevTools yang nunjukin Plus Jakarta 800, Fraunces 900 italic, JetBrains Mono 700 ke-load benar
6. **JSON-LD validation** dari https://validator.schema.org

---

## 12. OUT OF SCOPE

❌ Pages lain (Tentang, Blog, Karir) — handoff cuma satu landing page
❌ CMS / dashboard
❌ Database / payment
❌ Authentication
❌ Multi-language (siapkan struktur, jangan implement)
❌ Real countdown timer dynamic — bisa pakai static visual atau lib `countdown.ts` yang ngitung ke target date
❌ Real-time chat widget eksternal
❌ Modify konten/copywriting source — port persis (Indonesia, IDR pricing)
❌ Subtitusi font similar — wajib Plus Jakarta Sans + Fraunces + JetBrains Mono **persis**

---

## 13. ACCEPTANCE CRITERIA (CHECKLIST WAJIB)

Project DONE kalau **semua** berikut ✅:

**Build & runtime**:
- ✅ `bun install && bun run build` zero error/warning
- ✅ `bun run preview` jalan, page accessible
- ✅ `bun run astro check` zero error
- ✅ Bundle JS ≤ 8 KB gzipped
- ✅ No console error/warning di production

**Visual fidelity (PERSIS dengan source)**:
- ✅ Hero h1 pakai Fraunces 900 dengan kata "Dunia" italic + underline orange-light 8px
- ✅ Section title pakai Fraunces 800, kata accent italic dengan color orange
- ✅ Stat numbers pakai Fraunces 900 italic 64px
- ✅ Solution numbers pakai Fraunces 900 italic 80px (orange-light color)
- ✅ Section eyebrow pakai JetBrains Mono 700, uppercase 4px tracking, orange
- ✅ Logo bar items pakai Fraunces 700 18px, opacity 0.6
- ✅ Testimonial text pakai Fraunces 500 18px (NOT 700!)
- ✅ Body text pakai Plus Jakarta 400 16px line-height 1.6
- ✅ All buttons pakai Plus Jakarta 700, border-radius 100px
- ✅ Logo icon shape match source clip-path (perisai dengan dot + half-circle)

**Effects (PERSIS)**:
- ✅ Pulse dot di hero badge animasi 2s infinite
- ✅ Hero h1 highlight `::after` orange-light 8px bottom 4px z-index -1
- ✅ Solution card `::before` scaleX(0) → scaleX(1) on hover, top 4px orange
- ✅ Stats section radial glow top-left 600px white 0.1
- ✅ Final CTA radial glow centered 800px orange 0.2
- ✅ Hero radial glow top-right 500px orange 0.08
- ✅ Nav backdrop-filter blur(10px), bg rgba(255,255,255,0.95)
- ✅ Countdown backdrop-filter blur(10px), bg rgba(0,0,0,0.2)
- ✅ Hero card-1 has `🗼` emoji 200px opacity 0.15 right -40px bottom -50px
- ✅ Avatar stack overlap dengan margin-left -10px, border 3px white
- ✅ FAQ accordion + sign rotate 45deg saat open
- ✅ Floating WA scale(1.1) on hover
- ✅ Smooth scroll active

**Responsive**:
- ✅ @ 968px: hero-grid jadi 1-col, problem/solution/testi jadi 1-col, dest jadi 2-col, process jadi 2-col, stats jadi 2-col, footer jadi 2-col, comp-row jadi 1-col, countdown jadi 2-col
- ✅ Section padding turun ke 60px di mobile

**A11y**:
- ✅ Skip link works
- ✅ FAQ accordion aria-expanded works
- ✅ All emoji decorative dengan aria-hidden
- ✅ Form labels wajib (upgrade dari source — source pakai placeholder doang)
- ✅ Color contrast lulus AA
- ✅ `prefers-reduced-motion` disable pulse + hover transforms

**SEO**:
- ✅ Lighthouse SEO = 100
- ✅ JSON-LD valid (7 schemas)
- ✅ Sitemap.xml auto-generated
- ✅ robots.txt allow AI bots (GEO)
- ✅ All `target="_blank"` punya `rel="noopener noreferrer"`

**Performance**:
- ✅ Lighthouse Performance ≥ 95 (mobile + desktop)
- ✅ LCP < 1.5s
- ✅ CLS < 0.05
- ✅ INP < 100ms

---

## 14. REFERENSI DOKUMENTASI

- Astro 6 docs: https://docs.astro.build
- Astro Fonts API: https://docs.astro.build/en/reference/experimental-flags/fonts/
- Tailwind v4 docs: https://tailwindcss.com/docs
- Bun docs: https://bun.com/docs
- Plus Jakarta Sans: https://fonts.google.com/specimen/Plus+Jakarta+Sans
- Fraunces (variable serif): https://fonts.google.com/specimen/Fraunces
- JetBrains Mono: https://fonts.google.com/specimen/JetBrains+Mono
- Schema.org validator: https://validator.schema.org

---

## 15. CARA PAKAI PROMPT INI

### A. One-shot
Paste seluruh prompt + lampirin `remixed-b783e31a.html`, perintah:
> "Kerjain Phase 1–7 secara berurutan. Stop di tiap akhir phase, tunjukin progress, lanjut kalau gue confirm. Setiap section harus visual-match source HTML."

### B. Bertahap
Pisah jadi 7 sesi. Setiap sesi paste section 1-5 (context tetap) + section relevan dengan phase.

### C. Side-by-side check
Setelah Phase 5 selesai, **wajib** buka source HTML di browser kanan + Astro preview di kiri, sandingkan section per section. Jangan pass kalau ada visual diff.

---

**END OF SUPERPROMPT**

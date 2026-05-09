# Chelo Ramirez Musician Website

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Project Type
Single-file static website (`index.html` only). No build tools, no framework.

## Tech Stack
- Tailwind CSS via Play CDN (`https://cdn.tailwindcss.com`)
- GSAP 3.12.5 + ScrollTrigger via cdnjs
- Lenis 1.0.42 via jsdelivr (smooth scroll)
- Google Fonts: Cormorant Garamond + Inter

## Design System

### Colors
| Token      | Hex       | Brand Name      | Usage                                   |
|------------|-----------|-----------------|-----------------------------------------|
| Site bg    | `#0A0A0A` | Negro Onyx      | Page base (near-true onyx black)        |
| Wine red   | `#5A0A18` | Granate Profundo| Section accents, hover states           |
| Gold       | `#E5B547` | Oro Luminoso    | Highlights, dividers, section nums      |
| Gold High  | `#F5D078` | Oro Reflector   | Type callouts, foil highlights          |
| Copper     | `#C25028` | Cobre Encendido | Bold accents, photo grading             |
| Cream      | `#F2E6C9` | Hueso Cálido    | Primary text                            |
| Muted      | `#8A7A69` | —               | Secondary text, captions                |
| Surface    | `#1A1410` | —               | Alternating section backgrounds         |

### Typography
- Display/headings: Cormorant Garamond — italic 300 for taglines, 700 bold for hero
- Body: Inter 400/500
- Hero name: 8–10rem, line-height 0.9
- Section headings: minimum 4rem

### Tailwind Config (inside HTML)
```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        wine:     '#5A0A18',
        gold:     '#E5B547',
        goldHigh: '#F5D078',
        copper:   '#C25028',
        cream:    '#F2E6C9',
        muted:    '#8A7A69',
        surface:  '#1A1410',
        site:     '#0A0A0A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    }
  }
}
```

## Sections (in order)
1. `nav` — Fixed transparent → solid on scroll. Nav link labels: **Bio** (not "About"), Music, Videos, Gallery, Shows. Section ID remains `#about`.
2. `#hero` — Full-viewport, artist name dominant
3. `#about` — Two-column bio + stats
4. `#music` — Spotify embed + Apple Music button
5. `#videos` — YouTube embed + thumbnails
6. `#gallery` — Masonry photo grid
7. `#events` — Upcoming shows list
8. `#newsletter` — Slim email signup strip (between Events and Contact)
9. `#contact` — Booking form + footer (footer contains second newsletter form)

## Nav Sizing (locked)
The nav header is ~80px tall. Do not increase any nav element without checking this constraint.
- **Padding:** `1.4rem 2.5rem` (top/bottom × left/right)
- **Nav links:** `1.17rem` (BIO, MUSIC, VIDEOS, GALLERY, SHOWS)
- **Social icons:** 30px (Spotify, Apple Music, Instagram, Facebook, WhatsApp), 33px (YouTube), 29px (TikTok)
- **EN/ES toggle:** `1.17rem`
- **Height limiter:** CR logo (`text-3xl`, line-height `2.25rem` ≈ 36px) is the tallest element. Nothing in the nav row should exceed ~35px rendered height or the header will grow taller than 80px.

## GSAP + Lenis Init Order (critical)
```js
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(100); // complete animations instantly
}
// All ScrollTrigger animations go AFTER this block
```

## Placeholder Token Registry

### Still needed (edit `index.html` directly)
| Token                 | Location       | How to Replace                              |
|-----------------------|----------------|---------------------------------------------|
| `assets/images/hero.jpg` | Hero bg     | Drop real performance photo here            |
| `[EVENT_1_DATE]` etc. | Events section | Real show dates, venues, cities             |
| Gallery images        | `#gallery`     | Replace placeholder `<img>` srcs with real photos |

### Already wired via `config.js`
All social links (Spotify, Apple Music, YouTube, Instagram, Facebook, TikTok) and media embeds (Spotify iframe, YouTube video IDs) are set in `config.js` and applied automatically at runtime. The `[BOOKING_EMAIL]` link in the contact form and footer is also replaced automatically. To update any of these, edit `config.js` only — do not hardcode URLs in `index.html`.

Remaining `config.js` values still to fill:
- `social.whatsapp` — WhatsApp link
- `booking.formspreeEndpoint` — contact form endpoint
- `booking.newsletterEndpoint` — newsletter signup endpoint

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see Anti-Generic Guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the server: `python -m http.server 3000` (npx is not available on this machine)
- Run it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `_dev/node_modules/puppeteer`. Chrome cache is at `C:/Users/mauri/.cache/puppeteer/`.
- `screenshot.mjs` lives in `_dev/`. Screenshots save to `./temporary screenshots/`.
- After screenshotting, read the PNG with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

### Screenshot Organization
Two modes — choose based on intent:

**Quick check (no label):** `node _dev/screenshot.mjs http://localhost:3000`
- Deletes all previous unlabeled screenshots before running
- Saves exactly 7 files, always the same names: `screenshot-hero.png`, `screenshot-about.png`, etc.
- Folder never grows — always one fresh set. Use this for routine visual checks.

**Named snapshot (with label):** `node _dev/screenshot.mjs http://localhost:3000 before-nav-redesign`
- Does NOT delete anything
- Saves as `screenshot-before-nav-redesign-hero.png`, etc.
- Use this before making a big design change so you can compare before/after
- Delete labeled snapshots manually once they're no longer needed for comparison

**Mobile check:** `node _dev/screenshot-mobile.mjs http://localhost:3000`
- Simulates iPhone 12 Pro (390×844, deviceScaleFactor 2, touch enabled)
- Deletes previous `screenshot-mobile-*` files before running
- Saves 7 files: `screenshot-mobile-hero.png`, `screenshot-mobile-about.png`, etc.
- Use after any layout change to verify responsiveness at 390px width

## Brand Assets
- Always check the `assets/` folder before designing. It may contain photos, logos, color guides, or style references.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.
- Real photos go in `assets/images/`. See the Placeholder Token Registry for which tokens to replace.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Use only the design system tokens defined above (`wine`, `gold`, `cream`, `muted`, `surface`, `site`).
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Cormorant Garamond (display) + Inter (body) are the defined pair. Apply tight tracking (`-0.02em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base `#0D0A07` → elevated `#1A1410` → floating), not all sit at the same z-plane.

## Internationalisation (EN/ES)
The site has a working EN/ES language toggle. Key facts for future edits:

- **Translation data:** `TRANSLATIONS` object in the `<script>` block of `index.html` — two keys (`en`, `es`), each with ~45 string entries.
- **Swap function:** `setLanguage(lang)` — iterates `[data-i18n]` (textContent), `[data-i18n-html]` (innerHTML), and `[data-i18n-placeholder]` (placeholder attr).
- **Persistence:** `localStorage` key `'cr-lang'`; restored on every page load.
- **Toggle UI:** `#lang-toggle` click handler; `#lang-en` and `#lang-es` spans turn gold when active.
- **Adding new translatable text:** add a `data-i18n="key"` attribute to the element, then add the key to both `en` and `es` objects in `TRANSLATIONS`.

### Translation Workflow
Work in English first — do not update Spanish until English content is finalized.

1. Make all English content changes (`en` object in `TRANSLATIONS`).
2. When English is final, ask the user to confirm, then generate the Spanish in one pass.
3. Update the `es` object with all new/changed keys at once.

This avoids re-translating the same text multiple times while content is still evolving.

## Smart Quote Warning (Critical)
When pasting text from Word, Google Docs, or any rich-text source into JS string literals in `index.html`, the apostrophes may be **curly/smart quotes** (U+2018 `'` / U+2019 `'`) instead of ASCII apostrophes (U+0027 `'`). They look identical but are **not valid JS string delimiters** and cause a `SyntaxError: Invalid or unexpected token` that silently breaks the entire script block.

**Symptoms:** page renders (HTML is fine) but all JS is dead — no animations, no language toggle, no config wiring.

**Fix options:**
- Use `&rsquo;` HTML entity for apostrophes in values injected via `innerHTML`.
- Use double-quoted string values for text containing apostrophes: `'key': "it's fine"`.
- Run the syntax check below to confirm before screenshotting.

**After pasting any user-provided copy, always run the syntax check:**
```
node -e "
const fs=require('fs'), c=fs.readFileSync('index.html','utf8');
let p=0,b=[];while(true){const s=c.indexOf('<script>',p);if(s<0)break;const e=c.indexOf('</script>',s);b.push(c.slice(s+8,e));p=e+9;}
fs.writeFileSync('_dev/check-script.mjs',b[1]);
" && node --input-type=module < _dev/check-script.mjs 2>&1 | grep -i "SyntaxError" && echo "SYNTAX ERRORS FOUND" || echo "Syntax OK"
```
A `ReferenceError` (Lenis/gsap not defined) is expected and harmless — those come from the CDN. Only `SyntaxError` is a problem.

## Hard Rules
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not stop after one screenshot pass
- Do not add a JavaScript framework, build step, or split into multiple HTML files
- Do not change the color palette without user approval
- Do not use glassmorphism or visible card containers on scroll sections
- Do not use generic fonts (Arial, Roboto, or Inter) as a display font

## Serving Locally
Must serve over HTTP (not file://). npx is not available — use Python:
```
python -m http.server 3000
```
Then open http://localhost:3000

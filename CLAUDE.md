# Chelo Ramirez Musician Website

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Project Type
Static website. No build tools, no framework. Three core files:
- `index.html` — main fan-facing site (single file, never split into components)
- `private-events.html` — standalone B2B landing page for private event prospects
- `config.js` — all social links, booking email, Web3Forms key, and media embed IDs. Always update here, never hardcode in HTML.

Standalone landing pages (like `private-events.html`) are allowed when they serve a distinct audience or purpose. They share the same CDN stack, Tailwind config, and design system as `index.html` but are self-contained with their own `<script>` block and TRANSLATIONS object.

## Tech Stack
- Tailwind CSS via Play CDN (`https://cdn.tailwindcss.com`)
- GSAP 3.12.5 + ScrollTrigger via cdnjs
- Lenis 1.0.42 via jsdelivr (smooth scroll)
- Google Fonts: Cormorant Garamond + Inter

## Design System
Colors: `wine #5A0A18` · `gold #E5B547` · `goldHigh #F5D078` · `copper #C25028` · `cream #F2E6C9` · `muted #8A7A69` · `surface #1A1410` · `site #0A0A0A`
Typography: Cormorant Garamond (display, italic 300 taglines / bold 700 hero) + Inter (body 400/500). Hero name `clamp(2.8rem, 11vw, 10rem)`, section headings min 4rem.
Full color table, brand names, and Tailwind config block: `_dev/design-system.md`

## Sections (in order)
1. `nav` — Fixed transparent → solid on scroll. Nav link labels: **Bio** (not "About"), Music, Videos, Gallery, Shows. Section ID remains `#about`.
2. `#hero` — Full-viewport, artist name dominant
3. `#about` — Two-column bio + stats
4. `#music` — Spotify embed + Apple Music button
5. `#videos` — YouTube embed + thumbnails
6. `#gallery` — Masonry photo grid with lightbox. Clicking any `.gallery-item` opens `#lightbox` (full-screen overlay). Visibility toggled via `.is-open` class — do not re-implement.
   Legal modals: `#privacy-modal` and `#terms-modal` use the same `.is-open` pattern, triggered by `openLegalModal('modal-id')`. Linked from footer. Do not re-implement.
7. `#events` — Upcoming shows list + Past Performances subsection (`#past-performances`) + embedded newsletter signup strip
8. `#contact` — Booking form + footer (footer contains second newsletter form)

## Nav Sizing (locked)
The nav header is ~80px tall. Do not increase any nav element without checking this constraint.
- **Padding:** `1.4rem 2.5rem` (top/bottom × left/right)
- **Nav links:** `1.17rem`, letter-spacing `0.18em` (desktop only — hidden below 1280px)
- **Social icons:** 30px (Spotify, Apple Music, Instagram, Facebook, WhatsApp), 33px (YouTube), 29px (TikTok)
- **EN/ES toggle:** `1.17rem`
- **Height limiter:** CHR logo (`text-3xl`, line-height `2.25rem` ≈ 36px) is the tallest element. Nothing in the nav row should exceed ~35px rendered height.

### Nav responsive visibility rules
| Viewport | Nav links | Social icons | Lang toggle | Hamburger |
|---|---|---|---|---|
| < 768px (phone) | hidden | hidden | hidden | visible |
| 768–1279px (tablet + small desktop) | hidden | hidden | visible | visible |
| ≥ 1280px (desktop) | visible | visible (all 7) | visible | hidden |

- Nav links wrapper: `hidden xl:flex` · Social icons: `hidden xl:flex` · Lang toggle: `hidden md:block` · Hamburger: `xl:hidden`
- The hamburger dropdown already contains all nav links, social icons, and ES/EN — so no functionality is lost below 1280px.
- Run tablet and 1024px screenshot checks after any nav changes.

### Mobile menu short-screen behavior (do not remove)
`#mobile-menu` has `overflow-y: auto` always. Two `@media (max-height)` blocks compress the menu for landscape phones and short viewports:
- `max-height: 600px` — `justify-content: flex-start`, `padding: 3.5rem 2rem 2rem`, `gap: 0.75rem`, font `clamp(1.5rem, 5vw, 2rem)`
- `max-height: 420px` — further compression: `padding: 3rem 2rem 1.5rem`, `gap: 0.5rem`, font `clamp(1.25rem, 4vw, 1.6rem)`

The close button is `position: absolute` so it stays pinned in the top-right corner regardless of scroll position.

## GSAP + Lenis Init Order (critical)
Always init: Lenis → `lenis.on('scroll', ScrollTrigger.update)` → `gsap.ticker.add` → `lagSmoothing(0)` → `registerPlugin(ScrollTrigger)`. All ScrollTrigger animations go after. Exact code block: `_dev/animation-setup.md`

**Lenis + ScrollTrigger gotcha:** Lenis intercepts programmatic scroll (`scrollIntoView`, `window.scrollTo`), so ScrollTrigger's `start` threshold may never fire for elements deep in the page when a user navigates directly to a section. Only apply `gsap.from()` entrance animations to **headings and key structural elements** — never to dense content lists (venue grids, step cards, list items). Those should render visible by default.

## Placeholder Token Registry

All visual placeholders are resolved. The one remaining gap:

**`booking.newsletterEndpoint`** in `config.js` — newsletter forms are rendered but submissions go nowhere until this is set.

Everything else is live: social links, media embeds, booking email (`cheloramirezmusic@gmail.com`), hero photo, gallery photos, event dates.

**Booking form** submits via Web3Forms (AJAX). Key: `web3formsKey` in `config.js`.

## Reference Images
- If provided: match layout, spacing, typography, color exactly. Use `https://placehold.co/` for images. Do not improve or add to the design.
- If none: design from scratch with high craft (see Anti-Generic Guardrails).
- Screenshot, compare, fix mismatches, re-screenshot. Minimum 2 comparison rounds.

## Local Server
**Always serve on localhost** — never screenshot a `file:///` URL. `py -m http.server 3000` — run in background before screenshotting. Don't start a second instance if already running.

## Screenshot Workflow
Puppeteer at `_dev/node_modules/puppeteer`. Scripts in `_dev/`. Screenshots → `./temporary screenshots/`.
- **Quick:** `node _dev/screenshot.mjs http://localhost:3000`
- **Mobile:** `node _dev/screenshot-mobile.mjs http://localhost:3000`
- **Tablet:** `node _dev/screenshot-tablet.mjs http://localhost:3000`

Full usage — named snapshots, comparison tips, expected behavior per mode: `_dev/screenshot-guide.md`

## Brand Assets
Always check `brand assets/` before designing — use real assets, never placeholders where real ones exist.
Photos: `brand assets/photos/` · Logos: `brand assets/logos/`

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette. Use only `wine`, `gold`, `goldHigh`, `copper`, `cream`, `muted`, `surface`, `site`.
- **Shadows:** Layered, color-tinted, low opacity — never flat `shadow-md`.
- **Typography:** Cormorant Garamond + Inter only. Tight tracking (`-0.02em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add SVG noise grain for depth.
- **Animations:** Only `transform` and `opacity`. Never `transition-all`. Spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Images:** Gradient overlay (`bg-gradient-to-t from-black/60`) + `mix-blend-multiply` color treatment.
- **Depth:** Base `#0D0A07` → elevated `#1A1410` → floating. Never all at the same z-plane.

## Internationalisation (EN/ES)
`TRANSLATIONS` object in each page's `<script>` block. `setLanguage(lang)` swaps `[data-i18n]`, `[data-i18n-html]`, `[data-i18n-placeholder]`. Default: **Spanish (`es`)**. Elements added after the main `<script>` block must hardcode Spanish as default text. Language preference persists across pages via `localStorage` key `cr-lang`.

**Key naming convention:**
- `index.html` keys: plain names (`nav-about`, `contact-label`, etc.)
- `private-events.html` keys: **`pe-` prefix** (`pe-hero-label`, `pe-cta-btn`, etc.) — avoids collisions if keys are ever shared
- Keys used in both files (the contact callout banner): `pe-main-callout`, `pe-main-callout-sub`, `pe-main-callout-link` — defined in **both** TRANSLATIONS objects; update both when changing copy

After pasting any user-provided copy, run the smart quote syntax check. Full details, translation workflow, and syntax-check command: `_dev/i18n.md`

## Hard Rules
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not stop after one screenshot pass
- Do not add a JavaScript framework or build step. Do not split `index.html` into components. Standalone landing pages with distinct audiences are allowed.
- Do not change the color palette without user approval
- Do not use glassmorphism or visible card containers on scroll sections
- Do not use generic fonts (Arial, Roboto, or Inter) as a display font

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
Colors: `wine #5A0A18` · `gold #E5B547` · `goldHigh #F5D078` · `copper #C25028` · `cream #F2E6C9` · `muted #8A7A69` · `surface #1A1410` · `site #0A0A0A`
Typography: Cormorant Garamond (display, italic 300 taglines / bold 700 hero) + Inter (body 400/500). Hero name 8–10rem, section headings min 4rem.
Full color table, brand names, and Tailwind config block: `_dev/design-system.md`

## Sections (in order)
1. `nav` — Fixed transparent → solid on scroll. Nav link labels: **Bio** (not "About"), Music, Videos, Gallery, Shows. Section ID remains `#about`.
2. `#hero` — Full-viewport, artist name dominant
3. `#about` — Two-column bio + stats
4. `#music` — Spotify embed + Apple Music button
5. `#videos` — YouTube embed + thumbnails
6. `#gallery` — Masonry photo grid with lightbox. Clicking any `.gallery-item` opens `#lightbox` (full-screen overlay). Visibility toggled via `.is-open` class — do not re-implement.
7. `#events` — Upcoming shows list + embedded newsletter signup strip
8. `#contact` — Booking form + footer (footer contains second newsletter form)

## Nav Sizing (locked)
The nav header is ~80px tall. Do not increase any nav element without checking this constraint.
- **Padding:** `1.4rem 2.5rem` (top/bottom × left/right)
- **Nav links:** `1.17rem` desktop / `0.95rem` tablet (letter-spacing `0.18em` desktop, `0.07em` tablet via CSS media query `768px–1023px`)
- **Social icons:** 30px (Spotify, Apple Music, Instagram, Facebook, WhatsApp), 33px (YouTube), 29px (TikTok)
- **EN/ES toggle:** `1.17rem`
- **Height limiter:** CR logo (`text-3xl`, line-height `2.25rem` ≈ 36px) is the tallest element. Nothing in the nav row should exceed ~35px rendered height.

### Nav responsive visibility rules
| Viewport | Nav links | Social icons | Lang toggle | Hamburger |
|---|---|---|---|---|
| < 768px (phone) | hidden | hidden | hidden | visible |
| 768–1023px (tablet) | visible | **hidden** | visible | hidden |
| ≥ 1024px (desktop) | visible | visible (all 7) | visible | hidden |

Social icons live in `hidden lg:flex` — do not move to `hidden md:flex`. Run tablet screenshot check after any nav changes.

## GSAP + Lenis Init Order (critical)
Always init: Lenis → `lenis.on('scroll', ScrollTrigger.update)` → `gsap.ticker.add` → `lagSmoothing(0)` → `registerPlugin(ScrollTrigger)`. All ScrollTrigger animations go after. Exact code block: `_dev/animation-setup.md`

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
`TRANSLATIONS` object in `index.html` script block. `setLanguage(lang)` swaps `[data-i18n]`, `[data-i18n-html]`, `[data-i18n-placeholder]`. Default: **Spanish (`es`)**. Elements added after the main `<script>` block must hardcode Spanish as default text.
After pasting any user-provided copy, run the smart quote syntax check. Full details, translation workflow, and syntax-check command: `_dev/i18n.md`

## Hard Rules
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not stop after one screenshot pass
- Do not add a JavaScript framework, build step, or split into multiple HTML files
- Do not change the color palette without user approval
- Do not use glassmorphism or visible card containers on scroll sections
- Do not use generic fonts (Arial, Roboto, or Inter) as a display font

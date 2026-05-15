# Screenshot Guide

Puppeteer at `_dev/node_modules/puppeteer`. Chrome cache at `C:/Users/mauri/.cache/puppeteer/`.
Scripts live in `_dev/`. Screenshots save to `./temporary screenshots/`.

After screenshotting, read the PNG with the Read tool — Claude can see and analyze the image directly.
When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing.

## Quick check (no label)

`node _dev/screenshot.mjs http://localhost:3000`

- Deletes all previous unlabeled screenshots before running
- Saves exactly 7 files: `screenshot-hero.png`, `screenshot-about.png`, etc.
- Use for routine visual checks — folder never grows.

## Named snapshot (with label)

`node _dev/screenshot.mjs http://localhost:3000 before-nav-redesign`

- Does NOT delete anything
- Saves as `screenshot-before-nav-redesign-hero.png`, etc.
- Use before a big design change so you can compare before/after
- Delete labeled snapshots manually once no longer needed

## Mobile check

`node _dev/screenshot-mobile.mjs http://localhost:3000`

- Simulates iPhone 12 Pro (390×844, deviceScaleFactor 2, touch enabled)
- Deletes previous `screenshot-mobile-*` files before running
- Saves 7 files: `screenshot-mobile-hero.png`, etc.
- Use after any layout change to verify responsiveness at 390px width

## Tablet check

`node _dev/screenshot-tablet.mjs http://localhost:3000`

- Simulates iPad Air portrait (820×1180, deviceScaleFactor 2, touch enabled)
- Deletes previous `screenshot-tablet-*` files before running
- Saves 7 files: `screenshot-tablet-hero.png`, etc.
- Use after any nav or layout change to verify the 768–1024px breakpoint
- Expected nav: links visible, lang toggle visible, social icons hidden, no hamburger

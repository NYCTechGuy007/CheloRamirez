import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const __dirname     = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, '..', 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

// Without a label: delete all previous unlabeled screenshots (overwrite mode)
// With a label: keep everything, save as named snapshots
if (!label) {
  fs.readdirSync(screenshotDir)
    .filter(f => /^screenshot-[a-z]+\.png$/.test(f))
    .forEach(f => fs.unlinkSync(path.join(screenshotDir, f)));
}

function filename(section) {
  return label
    ? `screenshot-${label}-${section}.png`
    : `screenshot-${section}.png`;
}

const browser = await puppeteer.launch({ headless: true });
const page    = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Disable animations so all content is visible in screenshots
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 800));

const sections = ['hero', 'about', 'music', 'videos', 'gallery', 'events', 'contact'];

for (const id of sections) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'instant' });
  }, id);
  await new Promise(r => setTimeout(r, 300));

  const file = path.join(screenshotDir, filename(id));
  await page.screenshot({ path: file });
  console.log(`Saved: ${file}`);
}

await browser.close();

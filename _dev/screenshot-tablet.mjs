import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || 'tablet';

const __dirname     = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, '..', 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

// Delete previous tablet screenshots
fs.readdirSync(screenshotDir)
  .filter(f => f.startsWith(`screenshot-${label}-`))
  .forEach(f => fs.unlinkSync(path.join(screenshotDir, f)));

const browser = await puppeteer.launch({ headless: true });
const page    = await browser.newPage();

// iPad Air portrait (820×1180)
await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
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

  const file = path.join(screenshotDir, `screenshot-${label}-${id}.png`);
  await page.screenshot({ path: file });
  console.log(`Saved: ${file}`);
}

await browser.close();

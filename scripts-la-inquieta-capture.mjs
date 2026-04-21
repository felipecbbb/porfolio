import puppeteer from 'puppeteer-core';
import { mkdir } from 'fs/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'https://felipecbbb.github.io/la-inquieta/';
const OUT_DIR = './public/projects/la-inquieta';

await mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

const page = await browser.newPage();
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 2500));

await page.evaluate(() => {
  const fc = document.getElementById('floatCta');
  if (fc) fc.style.display = 'none';
  // Disable CSS animations so captures are stable
  const s = document.createElement('style');
  s.textContent = '*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; }';
  document.head.appendChild(s);
});

// Helper: scroll to element and capture the viewport (1440x900)
async function captureSection(selector, outFile, {scrollOffset = 0} = {}) {
  await page.evaluate((sel, off) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top - off, behavior: 'instant' });
  }, selector, scrollOffset);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: `${OUT_DIR}/${outFile}`,
    fullPage: false, // viewport only = what's on screen right now
  });
  console.log(`✓ ${outFile}`);
}

// 1. Hero — top of page
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await new Promise(r => setTimeout(r, 600));
await page.screenshot({
  path: `${OUT_DIR}/screenshot-hero.png`,
  fullPage: false,
});
console.log('✓ screenshot-hero.png');

// 2. Transport — scroll until section is at top (nav ~ 56px tall)
await captureSection('#transporte', 'screenshot-transport.png', { scrollOffset: 70 });

// 3. Bebidas
await captureSection('#bebidas', 'screenshot-bebidas.png', { scrollOffset: 70 });

// 4. Itinerario
await captureSection('#itinerario', 'screenshot-itinerario.png', { scrollOffset: 70 });

// 5. Full page (overview, not critical)
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({
  path: `${OUT_DIR}/screenshot-full.png`,
  fullPage: true,
});
console.log('✓ screenshot-full.png');

// 6. Mobile
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
await mobile.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 2500));
await mobile.evaluate(() => {
  const fc = document.getElementById('floatCta');
  if (fc) fc.style.display = 'none';
});
await mobile.screenshot({
  path: `${OUT_DIR}/screenshot-mobile.png`,
  fullPage: false,
});
console.log('✓ screenshot-mobile.png');

await browser.close();
console.log('Done.');

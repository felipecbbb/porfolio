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
await new Promise(r => setTimeout(r, 3000));

// Hide the floating CTA so it doesn't overlap
await page.evaluate(() => {
  const fc = document.getElementById('floatCta');
  if (fc) fc.style.display = 'none';
});

// 1. Full page
await page.screenshot({
  path: `${OUT_DIR}/screenshot-full.png`,
  fullPage: true,
});
console.log('✓ full page');

// 2. Hero (viewport) - 1440x900
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({
  path: `${OUT_DIR}/screenshot-hero.png`,
  clip: { x: 0, y: 0, width: 1440, height: 900 },
});
console.log('✓ hero');

// 3. Transport section
await page.evaluate(() => {
  document.querySelector('#transporte')?.scrollIntoView({ behavior: 'instant' });
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({
  path: `${OUT_DIR}/screenshot-transport.png`,
  clip: { x: 0, y: 0, width: 1440, height: 900 },
});
console.log('✓ transport');

// 4. Bebidas section
await page.evaluate(() => {
  document.querySelector('#bebidas')?.scrollIntoView({ behavior: 'instant' });
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({
  path: `${OUT_DIR}/screenshot-bebidas.png`,
  clip: { x: 0, y: 0, width: 1440, height: 900 },
});
console.log('✓ bebidas');

// 5. Itinerario
await page.evaluate(() => {
  document.querySelector('#itinerario')?.scrollIntoView({ behavior: 'instant' });
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({
  path: `${OUT_DIR}/screenshot-itinerario.png`,
  clip: { x: 0, y: 0, width: 1440, height: 900 },
});
console.log('✓ itinerario');

// 6. Mobile version
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
await mobile.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 3000));
await mobile.evaluate(() => {
  const fc = document.getElementById('floatCta');
  if (fc) fc.style.display = 'none';
});
await mobile.screenshot({
  path: `${OUT_DIR}/screenshot-mobile.png`,
  clip: { x: 0, y: 0, width: 390, height: 844 },
});
console.log('✓ mobile');

await browser.close();
console.log('Done.');

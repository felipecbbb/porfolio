import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto('https://www.wavepanel.app/', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 1500));

// Scroll through page by offsets, shoot at each
const h = await page.evaluate(() => document.documentElement.scrollHeight);
console.log('height', h);
for (let y = 0; y < h; y += 700) {
  await page.evaluate(yy => window.scrollTo(0, yy), y);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: `/tmp/wave-y${y}.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
}
// Find anchors / IDs
const anchors = await page.evaluate(() => {
  const ids = [...document.querySelectorAll('[id]')].map(e => e.id).filter(Boolean);
  return ids;
});
console.log('ids:', anchors);

// Inspect pricing h2/h3 specifically
const pricingInfo = await page.evaluate(() => {
  const headers = [...document.querySelectorAll('h1,h2,h3,h4')];
  return headers.map(h => h.textContent?.trim()).filter(t => t && t.length < 100);
});
console.log('headers:', pricingInfo);
await browser.close();

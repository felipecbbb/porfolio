import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', defaultViewport: { width: 1440, height: 900 } });
const page = await browser.newPage();
await page.goto('https://www.wavepanel.app/', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2000));

// Look for pricing section specifically
const prices = await page.evaluate(() => {
  // Find all elements that contain € or "/mes" or "€/mes"
  const all = [...document.querySelectorAll('*')];
  const candidates = all.filter(el => {
    const t = el.textContent || '';
    // Direct text node contains € and is small element
    return /€/.test(t) && el.children.length < 6 && t.length < 200;
  });
  return candidates.slice(0, 30).map(el => (el.textContent || '').replace(/\s+/g, ' ').trim());
});
console.log('=== PRICE FRAGMENTS ===');
prices.forEach(p => console.log('  ', p));

// Get the pricing section title parent
const pricingSection = await page.evaluate(() => {
  const h = [...document.querySelectorAll('h2')].find(x => /Precios transparentes/i.test(x.textContent || ''));
  if (!h) return null;
  // go up 3 levels to section
  let n = h;
  for (let i = 0; i < 4; i++) if (n.parentElement) n = n.parentElement;
  return (n.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 3000);
});
console.log('\n=== PRICING SECTION ===');
console.log(pricingSection);

// Also modules section
const modulesSection = await page.evaluate(() => {
  const h = [...document.querySelectorAll('h2')].find(x => /Paga solo por lo que/i.test(x.textContent || ''));
  if (!h) return null;
  let n = h;
  for (let i = 0; i < 4; i++) if (n.parentElement) n = n.parentElement;
  return (n.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 3000);
});
console.log('\n=== MODULES SECTION ===');
console.log(modulesSection);

await browser.close();

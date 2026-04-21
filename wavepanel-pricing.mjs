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

// Scroll to pricing / planes
await page.evaluate(() => {
  const planes = Array.from(document.querySelectorAll('*')).find(e =>
    (e.textContent || '').toLowerCase().trim().startsWith('planes')
  );
  if (planes) planes.scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: '/tmp/wave-planes.png', fullPage: false });

// Try comparative
await page.evaluate(() => {
  const comp = Array.from(document.querySelectorAll('*')).find(e =>
    (e.textContent || '').toLowerCase().trim().startsWith('comparativa')
  );
  if (comp) comp.scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: '/tmp/wave-comp.png', fullPage: false });

// Extract all visible text from pricing area
const text = await page.evaluate(() => {
  const sections = document.querySelectorAll('section, div');
  const results = [];
  for (const s of sections) {
    const t = (s.textContent || '').toLowerCase();
    if (t.includes('€') || t.includes('pago') || t.includes('mensual') || t.includes('basic')) {
      results.push(s.textContent?.replace(/\s+/g, ' ').trim().slice(0, 600));
    }
  }
  return [...new Set(results)].slice(0, 6);
});
console.log('=== text fragments ===');
text.forEach(t => console.log('---', t));

await browser.close();

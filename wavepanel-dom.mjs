import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', defaultViewport: { width: 1440, height: 900 } });
const page = await browser.newPage();
await page.goto('https://www.wavepanel.app/', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2000));
// Get FULL rendered body text, but in chunks by section
const sections = await page.evaluate(() => {
  const out = [];
  const heads = [...document.querySelectorAll('h2')];
  for (const h of heads) {
    const title = h.textContent?.trim() || '';
    // Collect siblings until next h2
    let cur = h.parentElement;
    const txt = cur ? (cur.textContent || '').replace(/\s+/g,' ').trim() : '';
    out.push({ title, body: txt.slice(0, 2000) });
  }
  return out;
});
for (const s of sections) {
  console.log(`\n### ${s.title}`);
  console.log(s.body.slice(0, 800));
}
await browser.close();

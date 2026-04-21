import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

async function cap(url, outPrefix) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    await page.evaluate(() => {
      const els = [...document.querySelectorAll('button, a')];
      for (const b of els) {
        const t = (b.textContent || '').toLowerCase().trim();
        if (/^(aceptar|accept|got it|ok|agree|entendido)/i.test(t)) { b.click(); return; }
      }
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: `${outPrefix}-hero.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let i = 1; i < 6 && i * 800 < height; i++) {
      await page.evaluate(y => window.scrollTo(0, y), i * 800);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: `${outPrefix}-section-${i}.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    }
    await page.screenshot({ path: `${outPrefix}-full.png`, fullPage: true });
    console.log('OK', url);
  } catch (e) {
    console.log('FAIL', url, e.message);
  }
  await page.close();
}

await cap('https://www.wavepanel.app/', '/tmp/wavepanel');
await cap('https://grupoaxial.es/', '/tmp/axial');

await browser.close();

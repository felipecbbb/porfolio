import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));

const pages = [
  ['/proyectos', 'proyectos'],
  ['/proyecto/wavepanel', 'wavepanel'],
  ['/proyecto/grupo-axial', 'grupo-axial'],
];

for (const [path, name] of pages) {
  console.log(`\n=== ${name} ===`);
  await page.goto(`http://localhost:3002${path}`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollTo(0, y);
        y += 400;
        if (y > document.body.scrollHeight + 500) { clearInterval(t); r(); }
      }, 120);
    });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `/tmp/v2-${name}-full.png`, fullPage: true });

  const imgs = await page.$$eval('img', els => els.map(i => ({
    alt: i.alt, complete: i.complete, nat: `${i.naturalWidth}x${i.naturalHeight}`,
    src: i.src.slice(-80),
  })));
  const broken = imgs.filter(i => !i.complete || i.nat === '0x0');
  console.log(`  imgs: ${imgs.length} total, ${broken.length} broken`);
  broken.forEach(b => console.log(`  ✗ ${b.alt} src=…${b.src}`));
}

await browser.close();

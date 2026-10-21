import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.SHOT_BASE_URL ?? "http://localhost:3000";
const outputDir = path.join(process.cwd(), ".screenshots");

const routes = [
  ["home", "/"],
  ["produk", "/produk"],
  ["teknologi", "/teknologi"],
  ["riset", "/riset"],
  ["sop", "/sop"],
  ["perawatan", "/perawatan"],
  ["dampak", "/dampak"],
  ["tentang", "/tentang"],
  ["kontak", "/kontak"],
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch();
let overflowFailures = 0;

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  for (const [name, route] of routes) {
    const consoleErrors = [];
    const onConsole = (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    };
    page.on("console", onConsole);

    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 0) overflowFailures += 1;

    try {
      await page.screenshot({
        path: path.join(outputDir, `${viewport.name}-${name}.png`),
        fullPage: true,
        animations: "disabled",
        timeout: 60000,
      });
    } catch {
      await page.screenshot({
        path: path.join(outputDir, `${viewport.name}-${name}.png`),
        fullPage: false,
        animations: "disabled",
        timeout: 60000,
      });
    }

    console.log(
      `${viewport.name.padEnd(8)} ${route.padEnd(12)} overflow=${overflow} consoleErrors=${consoleErrors.length}`,
    );
    page.off("console", onConsole);
  }

  await context.close();
}

await browser.close();

if (overflowFailures > 0) {
  console.error(`Gagal: ${overflowFailures} halaman memiliki horizontal overflow.`);
  process.exit(1);
}

console.log(`Screenshot tersimpan di ${outputDir}`);

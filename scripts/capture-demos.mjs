import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { site } from "../src/data/site.js";

await mkdir("public/images/demos", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const example of site.portfolioExamples) {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 860 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const response = await page.goto(example.url, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    if (!response?.ok())
      throw new Error(`${example.url}: HTTP ${response?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    const screenshot = await page.screenshot();
    await sharp(screenshot)
      .webp({ quality: 85 })
      .toFile(`public${example.image}`);
    console.log(`${example.id}: ${await page.title()} — ${response.status()}`);
    await page.close();
  }
} finally {
  await browser.close();
}

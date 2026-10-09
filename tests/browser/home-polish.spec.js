import { test, expect } from "@playwright/test";
import { site } from "../../src/data/site.js";
import { getExamples } from "../../src/lib/site.js";

async function appearance(locator) {
  return locator.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      background: style.backgroundColor, border: style.borderColor,
      color: style.color, shadow: style.boxShadow, transform: style.transform,
    };
  });
}

async function settled(locator) {
  await expect.poll(() => locator.evaluate((el) => el.getAnimations().length)).toBe(0);
}

test("Hero conserva las dos demos configuradas y sus enlaces seguros", async ({ page }) => {
  await page.goto("/");
  const examples = getExamples(site);
  const primary = examples.find((example) => example.hero);
  const secondary = examples.find((example) => example.featured && example.id !== primary.id);
  for (const [selector, example] of [[".hero-primary-demo", primary], [".hero-secondary-demo", secondary]]) {
    const link = page.locator(selector);
    await expect(link).toHaveAttribute("href", example.url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link.locator("img")).toHaveJSProperty("complete", true);
    expect(await link.locator("img").evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.locator(".origin-strip")).toContainText(site.brand.origin);
  await page.locator(".hero-actions .button-ghost").click();
  await expect(page).toHaveURL(/#ejemplos$/);
  await expect(page.locator("#ejemplos")).toBeFocused();
});

test("cards y profesiones: hover sutil sin cambiar semántica ni distribución, y foco por teclado", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#ejemplos");
  const card = page.locator(".portfolio-card").first();
  const layout = () => page.locator(".portfolio-card").evaluateAll((cards) => cards.map((el) => [el.offsetTop, el.offsetLeft, el.offsetWidth, el.offsetHeight]));
  const originalLayout = await layout();
  const originalCard = await appearance(card);
  await card.locator("h3").hover();
  await settled(card);
  const lift = await card.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42);
  expect(lift).toBeLessThan(0);
  expect(lift).toBeGreaterThanOrEqual(-3.5);
  expect((await appearance(card)).shadow).not.toBe(originalCard.shadow);
  expect(await layout()).toEqual(originalLayout);
  expect(await card.evaluate((el) => el.tagName === "ARTICLE" && !el.hasAttribute("tabindex") && !el.hasAttribute("role") && getComputedStyle(el).cursor !== "pointer")).toBe(true);
  await card.locator(".portfolio-preview a").hover();
  await expect.poll(async () => (await appearance(card.locator(".browser-frame"))).transform).not.toBe("none");
  await page.mouse.move(0, 0);
  await settled(card);
  await card.locator(".portfolio-preview a").focus();
  await page.keyboard.press("Tab");
  const cta = card.locator(".portfolio-card-bottom a");
  await expect(cta).toBeFocused();
  expect(await cta.evaluate((el) => el.matches(":focus-visible") && getComputedStyle(el).outlineStyle !== "none")).toBe(true);
  await settled(card);
  expect((await appearance(card)).border).not.toBe(originalCard.border);

  const chip = page.locator(".profession-list li").first();
  const ending = page.locator(".profession-ending");
  await chip.scrollIntoViewIfNeeded();
  const originalChip = await appearance(chip);
  const originalBounds = await chip.boundingBox();
  const originalEnding = await appearance(ending);
  await chip.hover();
  await settled(chip);
  expect((await appearance(chip)).background).not.toBe(originalChip.background);
  expect(await chip.boundingBox()).toEqual(originalBounds);
  expect(await chip.evaluate((el) => el.tagName === "LI" && !el.hasAttribute("tabindex") && !el.hasAttribute("role") && !el.querySelector("a, button") && getComputedStyle(el).cursor !== "pointer")).toBe(true);
  await ending.hover();
  expect(await appearance(ending)).toEqual(originalEnding);
  await expect(ending).toHaveText(site.audience.ending);
});

test("movimiento reducido conserva el feedback sin desplazar cards ni animar chips", async ({ page }) => {
  await page.goto("/#ejemplos");
  const card = page.locator(".portfolio-card").first();
  const before = await appearance(card);
  await card.locator("h3").hover();
  expect((await appearance(card)).transform).toBe(before.transform);
  expect((await appearance(card)).border).not.toBe(before.border);
  expect(await card.evaluate((el) => el.getAnimations().length)).toBe(0);
  const chip = page.locator(".profession-list li").first();
  await chip.hover();
  expect((await appearance(chip)).transform).toBe("none");
  expect(await chip.evaluate((el) => el.getAnimations().length)).toBe(0);
});

test("pantalla táctil no activa el nuevo hover ni convierte texto en controles", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:4176", hasTouch: true, isMobile: true,
    viewport: { width: 375, height: 900 }, reducedMotion: "no-preference",
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    expect(await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches)).toBe(false);
    for (const selector of [".portfolio-card", ".profession-list li"]) {
      const item = page.locator(selector).first();
      await item.scrollIntoViewIfNeeded();
      const before = await appearance(item);
      const target = selector === ".portfolio-card" ? item.locator("h3") : item;
      await target.tap();
      await settled(item);
      expect(await appearance(item)).toEqual(before);
      await expect(page).toHaveURL("http://127.0.0.1:4176/");
    }
  } finally {
    await context.close();
  }
});

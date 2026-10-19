import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { site } from "../../src/data/site.js";
import { faqAnswer } from "../../src/lib/site.js";

for (const width of [375, 768, 1024, 1440]) {
  test(`FAQ y condiciones: contenido, teclado, accesibilidad y layout a ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#preguntas");
    const details = page.locator('.faq-list details[name="faq"]');
    await expect(details).toHaveCount(site.faq.length);
    await expect(details.locator("summary")).toHaveText(site.faq.map((item) => item.question));
    for (const [index, item] of site.faq.entries()) {
      const summary = details.nth(index).locator("summary");
      await summary.focus();
      await page.keyboard.press(index % 2 ? "Space" : "Enter");
      await expect(details.nth(index)).toHaveAttribute("open", "");
      await expect(page.locator(".faq-list details[open]")).toHaveCount(1);
      await expect(details.nth(index).locator("p")).toContainText(faqAnswer(item, site));
      await expect(summary).toBeFocused();
      expect(await summary.evaluate((el) => el.matches(":focus-visible") && getComputedStyle(el).outlineStyle !== "none")).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(audit.violations).toEqual([]);
    const style = ".site-header, .skip-link { visibility: hidden !important; }";
    await page.locator("#preguntas").screenshot({ path: `test-results/faq-expanded-${width}.png`, style });
    await page.keyboard.press("Space");
    await expect(page.locator(".faq-list details[open]")).toHaveCount(0);
    await expect(page.locator(".pricing-base")).toContainText("12 meses de alojamiento");
    await expect(page.locator(".pricing-base")).toContainText("primeros 6 meses");
    await expect(page.locator(".pricing-bottom")).toContainText("10.000 ARS");
    await expect(page.locator(".pricing-bottom")).toContainText("después de aprobar la versión final");
    await expect(page.locator(".process-timing")).toContainText("5 días hábiles");
    await expect(page.locator(".process-steps li").last()).toContainText("2 rondas incluidas");
    await details.nth(2).locator("summary").click();
    const link = details.nth(2).getByRole("link", { name: "Explorá las secciones disponibles." });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/secciones$/);
    expect(errors).toEqual([]);
  });
}

test("FAQ anima expansión y contracción nativas, también al cambiar de pregunta", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#preguntas");
  await page.evaluate(() => document.fonts.ready);
  const supported = await page.evaluate(() => CSS.supports("selector(details::details-content)") && CSS.supports("interpolate-size", "allow-keywords") && CSS.supports("transition-behavior", "allow-discrete"));
  expect(supported).toBe(true); // The configured Chrome runner must exercise the enhancement.
  const first = page.locator(".faq-list details").first();
  async function samples(changeQuestion = false) {
    return first.evaluate((el, change) => new Promise((resolve) => {
      const next = el.nextElementSibling;
      const startHeight = el.getBoundingClientRect().height;
      (change ? next : el).querySelector("summary").click();
      const frames = [];
      const start = performance.now();
      function measure(now) {
        frames.push({ height: el.getBoundingClientRect().height, nextTop: next.getBoundingClientRect().top });
        if (now - start < 500) requestAnimationFrame(measure);
        else resolve({ startHeight, frames });
      }
      requestAnimationFrame(measure);
    }), changeQuestion);
  }
  const opening = await samples();
  const expanded = opening.frames.at(-1).height;
  expect(expanded).toBeGreaterThan(opening.startHeight);
  expect(opening.frames.some((frame) => frame.height > opening.startHeight + 1 && frame.height < expanded - 1)).toBe(true);
  const closing = await samples();
  const collapsed = closing.frames.at(-1).height;
  expect(collapsed).toBeCloseTo(opening.startHeight, 0);
  expect(closing.frames.some((frame) => frame.height > collapsed + 1 && frame.height < closing.startHeight - 1)).toBe(true);
  expect(closing.frames.at(-1).nextTop).toBeLessThan(closing.frames[0].nextTop);
  await samples();
  const switching = await samples(true);
  expect(switching.frames.at(-1).height).toBeCloseTo(collapsed, 0);
  expect(switching.frames.some((frame) => frame.height > collapsed + 1 && frame.height < switching.startHeight - 1)).toBe(true);
  await expect(page.locator(".faq-list details[open]")).toHaveCount(1);
  await expect(page.locator(".faq-list details").nth(1)).toHaveAttribute("open", "");
});

test("FAQ con movimiento reducido y sin reglas progresivas conserva apertura, cierre y foco", async ({ page }) => {
  await page.goto("/#preguntas");
  const first = page.locator(".faq-list details").first();
  await first.locator("summary").focus();
  await page.keyboard.press("Enter");
  expect(await first.evaluate((el) => getComputedStyle(el, "::details-content").transitionDuration)).toBe("0s");
  expect(await first.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0);
  await page.keyboard.press("Space");
  await expect(first).not.toHaveAttribute("open", "");
  await expect(first.locator("p")).toBeHidden();
  // Exercise the same native fallback used when @supports rejects the enhancement.
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const removed = await page.evaluate(() => {
    let count = 0;
    for (const sheet of document.styleSheets) {
      for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
        const rule = sheet.cssRules[i];
        if (rule instanceof CSSSupportsRule && rule.conditionText.includes("details-content")) { sheet.deleteRule(i); count++; }
      }
    }
    return count;
  });
  expect(removed).toBeGreaterThan(0);
  await page.keyboard.press("Enter");
  await expect(first.locator("p")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(first.locator("p")).toBeHidden();
  await expect(first.locator("summary")).toBeFocused();
});

test("FAQ y condiciones quedan disponibles sin JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4176/#preguntas");
    const details = page.locator(".faq-list details");
    await expect(details).toHaveCount(11);
    await details.nth(9).locator("summary").click();
    await expect(details.nth(9).locator("p")).toContainText("10.000 ARS");
    await details.nth(10).locator("summary").click();
    await expect(page.locator(".faq-list details[open]")).toHaveCount(1);
    await expect(details.nth(10).locator("p")).toContainText("transferencia gratuita");
    await details.nth(10).locator("summary").click();
    await expect(page.locator(".faq-list details[open]")).toHaveCount(0);
  } finally { await context.close(); }
});

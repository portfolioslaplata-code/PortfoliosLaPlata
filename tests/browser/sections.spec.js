import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectAtSection(page, id) {
  await expect.poll(() => page.locator(`#${id}`).evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeGreaterThanOrEqual(75);
  await expect.poll(() => page.locator(`#${id}`).evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeLessThanOrEqual(105);
}

for (const width of [320, 375, 430, 768, 900, 1024, 1440]) {
  test(`catálogo responsive, previews y accesibilidad a ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/secciones");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Elegí qué querés mostrar.");
    await expect(page.locator("#standard .section-card")).toHaveCount(10);
    await expect(page.locator("#advanced .section-card")).toHaveCount(8);
    await expect(page.locator('.section-preview[aria-hidden="true"]')).toHaveCount(18);
    await expect(page.getByRole("link", { name: "Contanos tu idea", exact: true })).toHaveAttribute("href", /^mailto:/);
    await expect(page.getByRole("link", { name: "Volver al inicio", exact: true })).toHaveAttribute("href", "/#inicio");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator(".catalog-count-note")).toContainText("no cuentan dentro del límite");
    await page.getByRole("navigation", { name: "Tipos de secciones" }).getByRole("link", { name: "Avanzadas" }).click();
    await expectAtSection(page, "advanced");
    await page.getByRole("navigation", { name: "Navegación al pie" }).getByRole("link", { name: "Planes", exact: true }).click();
    await expect(page).toHaveURL(/\/#planes$/);
    await expectAtSection(page, "planes");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto("/secciones");
    if ([320, 768, 1440].includes(width)) {
      const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(audit.violations).toEqual([]);
      await page.screenshot({ path: `test-results/sections-${width}.png`, fullPage: true });
      await page.locator(".catalog-hero").screenshot({ path: `test-results/sections-hero-${width}.png` });
      await page.locator("#advanced .section-card").first().screenshot({ path: `test-results/sections-preview-${width}.png` });
    }
    expect(errors).toEqual([]);
  });
}

test("rutas y hashes: Navbar, Planes, scroll repetido e historial", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  // A persistent marker ensures navigation stays client-side.
  await page.evaluate(() => { window.__navigationMarker = true; });
  const nav = page.getByRole("navigation", { name: "Navegación principal", exact: true });
  await nav.getByRole("link", { name: "Secciones", exact: true }).click();
  await expect(page).toHaveURL(/\/secciones$/);
  await expect(page).toHaveTitle("Secciones para tu portfolio | Portfolios La Plata");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await expect(nav.getByRole("link", { name: "Secciones", exact: true })).toHaveAttribute("aria-current", "page");
  for (const [label, id] of [["Planes", "planes"], ["Ejemplos", "ejemplos"], ["Cómo funciona", "proceso"], ["Preguntas", "preguntas"]]) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/#${id}$`));
    await expectAtSection(page, id);
    await expect(page).toHaveTitle(/Portfolios La Plata/);
    await nav.getByRole("link", { name: "Secciones", exact: true }).click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  }
  await nav.getByRole("link", { name: "Planes", exact: true }).click();
  await expectAtSection(page, "planes");
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await nav.getByRole("link", { name: "Planes", exact: true }).click();
  await expectAtSection(page, "planes");
  const explore = page.locator(".product-card").nth(1).getByRole("link", { name: "Explorar secciones" });
  await explore.scrollIntoViewIfNeeded();
  const previousScroll = await page.evaluate(() => scrollY);
  await explore.click();
  await expect(page).toHaveURL(/\/secciones#advanced$/);
  await expectAtSection(page, "advanced");
  await page.goBack();
  await expect(page).toHaveURL(/\/#planes$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeCloseTo(previousScroll, 0);
  await page.goForward();
  await expectAtSection(page, "advanced");
  expect(await page.evaluate(() => window.__navigationMarker)).toBe(true);
});

test("menú móvil entre rutas: teclado, Escape y cierre al navegar", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  const nav = page.getByRole("navigation", { name: "Navegación móvil", exact: true });
  await nav.getByRole("link", { name: "Secciones", exact: true }).click();
  await expect(nav).toBeHidden();
  await expect(page).toHaveURL(/\/secciones$/);
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await nav.getByRole("link", { name: "Planes", exact: true }).click();
  await expect(nav).toBeHidden();
  await expectAtSection(page, "planes");
  await page.locator(".product-card").first().getByRole("link", { name: "Explorar secciones" }).click();
  await expectAtSection(page, "standard");
});

test("carga directa, refresh con hash y HTML de /secciones sin JavaScript", async ({ page, browser }) => {
  await page.goto("/secciones#advanced");
  await expectAtSection(page, "advanced");
  await page.reload();
  await expectAtSection(page, "advanced");
  await page.goto("/#planes");
  await expectAtSection(page, "planes");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("/secciones");
  await expect(staticPage.getByRole("heading", { level: 1 })).toHaveText("Elegí qué querés mostrar.");
  await expect(staticPage.locator(".section-card")).toHaveCount(18);
  await expect(staticPage).toHaveTitle("Secciones para tu portfolio | Portfolios La Plata");
  await expect(staticPage.locator('meta[name="description"]')).toHaveAttribute("content", /secciones estándar, avanzadas y personalizadas/);
  expect(JSON.parse(await staticPage.locator('script[type="application/ld+json"]').textContent())["@type"]).toBe("CollectionPage");
  await context.close();
});

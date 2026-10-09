import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { site } from "../../src/data/site.js";
import { getCatalog, getComplements, startingPrice } from "../../src/lib/site.js";

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
    await expect(page.locator("#standard .catalog-category-price")).toContainText("30.000");
    await expect(page.locator("#advanced .catalog-category-price")).toContainText("65.000");
    await expect(page.locator(".catalog-formula")).toContainText("130.000");
    await expect(page.locator("#custom")).toContainText("Cotización personalizada");
    await expect(page.locator("body")).not.toContainText(/\b(?:Planes|Esencial|Esenciales|Profesional|Personalizado)\b/);
    await expect(page.locator(".section-availability")).toHaveCount(0);
    await expect(page.locator('.section-preview[aria-hidden="true"]')).toHaveCount(19);
    await expect(page.locator("#complements .section-card")).toHaveCount(1);
    await expect(page.locator("#complements")).toContainText("CV descargable");
    await expect(page.locator("#complements")).toContainText("15.000");
    await expect(page.getByRole("link", { name: "Contanos tu idea", exact: true })).toHaveAttribute("href", /^mailto:/);
    await expect(page.getByRole("link", { name: "Volver al inicio", exact: true })).toHaveAttribute("href", "/#inicio");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator(".catalog-count-note")).toContainText("No se cobran como secciones independientes");
    await page.getByRole("navigation", { name: "Tipos de secciones" }).getByRole("link", { name: "Avanzadas" }).click();
    await expectAtSection(page, "advanced");
    await page.getByRole("navigation", { name: "Tipos de secciones" }).getByRole("link", { name: "Complementos" }).click();
    await expectAtSection(page, "complements");
    await page.getByRole("navigation", { name: "Navegación al pie" }).getByRole("link", { name: "Precios", exact: true }).click();
    await expect(page).toHaveURL(/\/#precios$/);
    await expectAtSection(page, "precios");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto("/secciones");
    if ([320, 768, 1440].includes(width)) {
      const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(audit.violations).toEqual([]);
      await page.screenshot({ path: `test-results/sections-${width}.png`, fullPage: true });
      await page.locator(".catalog-hero").screenshot({ path: `test-results/sections-hero-${width}.png` });
      await page.locator(".catalog-formula").screenshot({ path: `test-results/sections-formula-${width}.png` });
      await page.locator("#standard .catalog-category-heading").screenshot({ path: `test-results/sections-price-${width}.png` });
      await page.locator("#advanced .section-card").first().screenshot({ path: `test-results/sections-preview-${width}.png` });
    }
    expect(errors).toEqual([]);
  });
}

test("rutas y hashes: Navbar, Precios, scroll repetido e historial", async ({ page }) => {
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
  for (const [label, id] of [["Precios", "precios"], ["Ejemplos", "ejemplos"], ["Cómo funciona", "proceso"], ["Preguntas", "preguntas"]]) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/#${id}$`));
    await expectAtSection(page, id);
    await expect(page).toHaveTitle(/Portfolios La Plata/);
    await nav.getByRole("link", { name: "Secciones", exact: true }).click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  }
  await nav.getByRole("link", { name: "Precios", exact: true }).click();
  await expectAtSection(page, "precios");
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await nav.getByRole("link", { name: "Precios", exact: true }).click();
  await expectAtSection(page, "precios");
  const explore = page.getByRole("link", { name: "Ver secciones avanzadas", exact: true });
  await explore.scrollIntoViewIfNeeded();
  const previousScroll = await page.evaluate(() => scrollY);
  await explore.click();
  await expect(page).toHaveURL(/\/secciones#advanced$/);
  await expectAtSection(page, "advanced");
  await page.goBack();
  await expect(page).toHaveURL(/\/#precios$/);
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
  await nav.getByRole("link", { name: "Precios", exact: true }).click();
  await expect(nav).toBeHidden();
  await expectAtSection(page, "precios");
  await page.getByRole("link", { name: "Ver secciones estándar", exact: true }).click();
  await expectAtSection(page, "standard");
});

test("carga directa, refresh con hash y HTML de /secciones sin JavaScript", async ({ page, browser }) => {
  await page.goto("/secciones#advanced");
  await expectAtSection(page, "advanced");
  await page.reload();
  await expectAtSection(page, "advanced");
  await page.goto("/#precios");
  await expectAtSection(page, "precios");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("/secciones");
  await expect(staticPage.getByRole("heading", { level: 1 })).toHaveText("Elegí qué querés mostrar.");
  await expect(staticPage.locator(".section-card")).toHaveCount(19);
  await expect(staticPage).toHaveTitle("Secciones para tu portfolio | Portfolios La Plata");
  await expect(staticPage.locator('meta[name="description"]')).toHaveAttribute("content", /secciones estándar y avanzadas, los complementos y las opciones de desarrollo a medida/);
  expect(JSON.parse(await staticPage.locator('script[type="application/ld+json"]').textContent())["@type"]).toBe("CollectionPage");
  await context.close();
});

test("las 19 opciones abren contenido propio y precio del modelo comercial", async ({ page }) => {
  await page.goto("/secciones");
  for (const category of [...getCatalog(site), getComplements(site)]) {
    for (const item of category.items) {
      const trigger = page.getByRole("button", { name: `Ver detalle: ${item.name}`, exact: true });
      // Click the preview: the entire card must lead to the same semantic button.
      await page.locator(".section-card").filter({ has: trigger }).click({ position: { x: 35, y: 35 } });
      const modal = page.getByRole("dialog", { name: item.name, exact: true });
      await expect(modal).toBeVisible();
      await expect(modal.locator(".section-kind")).toHaveText(category.itemLabel);
      await expect(modal).toContainText(item.details.description);
      await expect(modal.getByRole("listitem")).toHaveText(item.details.includes);
      await expect(modal).toContainText(item.idealFor);
      await expect(modal.locator(".section-modal-price strong")).toHaveText(startingPrice(site, item.price == null ? category : item));
      await expect(modal.locator(".section-preview-modal")).toHaveCount(1);
      await modal.getByRole("button", { name: "Cerrar", exact: true }).click();
      await expect(modal).toHaveCount(0);
      await expect(trigger).toBeFocused();
    }
  }
});

test("teclado, Escape, foco contenido, fondo inerte y scroll restaurado", async ({ page }) => {
  await page.goto("/secciones#standard");
  const trigger = page.getByRole("button", { name: "Ver detalle: Sobre mí", exact: true });
  await trigger.focus();
  const initialScroll = await page.evaluate(() => scrollY);
  for (const key of ["Enter", "Space"]) {
    await page.keyboard.press(key);
    const modal = page.getByRole("dialog");
    const close = modal.getByRole("button", { name: "Cerrar" });
    await expect(close).toBeFocused();
    await expect(modal).toHaveAttribute("aria-modal", "true");
    expect(await modal.evaluate((el) => el.matches(":modal"))).toBe(true);
    // Neither a programmatic focus request nor pointer/wheel input reaches the background.
    await page.locator('.catalog-jumps a').first().evaluate((el) => el.focus());
    await expect(close).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(modal.getByRole("region")).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(close).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("position", "fixed");
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await page.mouse.move(1, 1);
    await page.mouse.wheel(0, 600);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await page.keyboard.press("Escape");
    await expect(modal).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => scrollY)).toBe(initialScroll);
    expect(await page.locator("body").evaluate((el) => el.style.position)).toBe("");
  }
});

for (const width of [320, 375, 430, 768, 1440]) {
  test(`modal responsive, teclado, scroll y accesibilidad a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 740 });
    await page.goto("/secciones");
    for (const name of ["Sobre mí", "Mini case study", "CV descargable"]) {
      const trigger = page.getByRole("button", { name: `Ver detalle: ${name}`, exact: true });
      await trigger.click();
      const modal = page.getByRole("dialog", { name, exact: true });
      await expect(modal).toBeVisible();
      expect(await modal.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const scroll = el.querySelector(".section-modal-scroll");
        const preview = el.querySelector(".preview-window");
        return r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight &&
          scroll.scrollWidth <= scroll.clientWidth && preview.scrollWidth <= preview.clientWidth;
      })).toBe(true);
      await expect(modal).toHaveCSS("animation-name", "none");
      await modal.getByRole("region").focus();
      await page.keyboard.press("Control+End");
      await expect(modal.locator(".section-modal-price strong")).toBeInViewport();
      await expect(modal.getByRole("button", { name: "Cerrar" })).toBeInViewport();
      if ([320, 768, 1440].includes(width)) {
        const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(audit.violations).toEqual([]);
        await modal.getByRole("region").evaluate((el) => { el.scrollTop = 0; });
        await page.screenshot({ path: `test-results/modal-${name.replaceAll(" ", "-")}-${width}.png` });
      }
      await modal.getByRole("button", { name: "Cerrar" }).click();
      await expect(trigger).toBeFocused();
    }
  });
}

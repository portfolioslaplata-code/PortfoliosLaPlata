import { test, expect } from "@playwright/test";

async function atSection(page, id) {
  await expect(page.locator(`#${id}`)).toBeFocused();
  await expect.poll(() => page.locator(`#${id}`).evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBe(100);
}

test("Navbar: distribución desktop y menú móvil sin duplicados ni overflow", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 375, 768, 800, 801, 900, 1024, 1050, 1051, 1100, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const desktop = page.getByRole("navigation", { name: "Navegación principal", exact: true });
    if (width > 800) {
      await expect(desktop).toBeVisible();
      await expect(desktop.getByRole("link")).toHaveText(["Ejemplos", "Precios", "Cómo funciona", "Preguntas", "Secciones"]);
      const catalog = desktop.getByRole("link", { name: "Secciones", exact: true });
      await expect(catalog).toHaveAttribute("href", "/secciones");
      await expect(catalog).not.toHaveAttribute("target", "_blank");
      // The existing compact desktop layout hides the contact CTA through 1050px.
      if (width > 1050) await expect(page.locator(".nav-contact")).toBeVisible();
      else await expect(page.locator(".nav-contact")).toBeHidden();
      const bounds = await page.locator(".navbar .brand:visible, .desktop-navigation a:visible, .nav-contact:visible").evaluateAll((els) => els.map((el) => {
        const r = el.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
      }));
      expect(bounds.every((r, i) => r.left >= 0 && r.right <= width && (!i || r.left >= bounds[i - 1].right))).toBe(true);
      await page.locator(".site-header").screenshot({ path: `test-results/navbar-${width}.png` });
    } else {
      await expect(desktop).toBeHidden();
      await page.getByRole("button", { name: "Abrir menú" }).click();
      const mobile = page.getByRole("navigation", { name: "Navegación móvil", exact: true });
      await expect(mobile.getByRole("link", { name: "Secciones", exact: true })).toHaveCount(1);
      await expect(page.locator('.site-header a[href="/secciones"]:visible')).toHaveCount(1);
      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: "Abrir menú" })).toBeFocused();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("Navbar: línea desde la izquierda, sin mover enlaces, y foco visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const link = page.locator(".desktop-navigation a").first();
  const line = () => link.locator("span").evaluate((el) => {
    const style = getComputedStyle(el, "::after");
    return { scale: new DOMMatrixReadOnly(style.transform).m11, origin: style.transformOrigin };
  });
  const before = await link.boundingBox();
  expect((await line()).scale).toBe(0);
  expect((await line()).origin.startsWith("0px")).toBe(true);
  await link.hover();
  await expect.poll(async () => (await line()).scale).toBe(1);
  expect(await link.boundingBox()).toEqual(before);
  await page.mouse.move(0, 0);
  await expect.poll(async () => (await line()).scale).toBe(0);
  await page.locator(".navbar .brand").focus();
  await page.keyboard.press("Tab");
  await expect(link).toBeFocused();
  await expect.poll(async () => (await line()).scale).toBe(1);
  expect(await link.evaluate((el) => el.matches(":focus-visible") && getComputedStyle(el).outlineStyle !== "none")).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await link.locator("span").evaluate((el) => getComputedStyle(el, "::after").transitionDuration)).toBe("0s");
});

for (const reducedMotion of ["no-preference", "reduce"]) {
  test(`Navbar: scroll, repetición, teclado e historial con movimiento ${reducedMotion}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.addInitScript(() => {
      window.__scrollRequests = [];
      window.__scrollSamples = [];
      const intoView = Element.prototype.scrollIntoView;
      Element.prototype.scrollIntoView = function (options) {
        window.__scrollRequests.push({ id: this.id, behavior: options?.behavior });
        return intoView.call(this, options);
      };
      const scroll = window.scrollTo;
      window.scrollTo = function (...args) {
        window.__scrollRequests.push({ id: "window", behavior: args[0]?.behavior });
        return scroll.apply(this, args);
      };
      window.addEventListener("scroll", () => window.__scrollSamples.push(scrollY));
    });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const nav = page.getByRole("navigation", { name: "Navegación principal", exact: true });
    const prices = nav.getByRole("link", { name: "Precios", exact: true });
    await page.evaluate(() => { window.__scrollRequests = []; window.__scrollSamples = []; });
    await prices.click();
    await atSection(page, "precios");
    const expected = reducedMotion === "reduce" ? "instant" : "smooth";
    expect(await page.evaluate(() => window.__scrollRequests)).toEqual([{ id: "precios", behavior: expected }]);
    if (expected === "smooth") {
      expect(await page.evaluate(() => window.__scrollSamples.some((y) => y > 0 && y < scrollY - 10))).toBe(true);
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await prices.focus();
    await page.keyboard.press("Enter");
    await atSection(page, "precios");
    await nav.getByRole("link", { name: "Secciones", exact: true }).click();
    await expect(page).toHaveURL(/\/secciones$/);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await prices.click();
    await atSection(page, "precios");
    expect(await page.evaluate(() => window.__scrollRequests.at(-1))).toEqual({ id: "precios", behavior: "instant" });
    await page.goBack();
    await expect(page).toHaveURL(/\/secciones$/);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await page.goForward();
    await atSection(page, "precios");
    expect(await page.evaluate(() => window.__scrollRequests.at(-1).behavior)).toBe("instant");
    await page.reload();
    await expect.poll(() => page.locator("#precios").evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBe(100);
    expect(await page.evaluate(() => window.__scrollRequests.every((request) => request.behavior === "instant"))).toBe(true);
  });
}

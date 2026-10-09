import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 375, 430, 768, 800, 801, 900, 1024, 1100, 1440]) {
  test(`base, secciones y ejemplos sin overflow a ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".portfolio-card")).toHaveCount(3);
    await expect(page.locator(".portfolio-info h3")).toHaveText(["Editorial", "Minimal", "Profundidad"]);
    await expect(page.locator(".demo-composition > strong")).toHaveText([
      "5 secciones estándar", "6 secciones estándar", "6 estándar + 2 avanzadas",
    ]);
    await expect(page.locator('.demo-complements')).toHaveCount(1);
    await expect(page.locator('[data-example="profundidad"] .demo-complements')).toHaveText("Complemento: CV descargable");
    await expect(page.locator('.demo-complements a')).toHaveAttribute("href", "/secciones#complements");
    for (const [id, count] of [["editorial", 5], ["minimal", 6], ["profundidad", 8]]) {
      await expect(page.locator(`[data-example="${id}"] .demo-composition li`)).toHaveCount(count);
    }
    await expect(page.locator('[data-example="minimal"] .demo-composition li')).toHaveText([
      "Sobre mí", "Servicios", "Logros", "Experiencia y Formación", "Certificaciones", "Habilidades",
    ]);
    const layout = await page.locator('.portfolio-card').evaluateAll((cards) => cards.map((card) => {
      const rect = card.getBoundingClientRect();
      const summary = card.querySelector('.demo-composition strong').getBoundingClientRect();
      const list = card.querySelector('.demo-composition ul').getBoundingClientRect();
      return {
        top: rect.top, height: rect.height,
        ctaBottom: card.querySelector('.portfolio-card-bottom a').getBoundingClientRect().bottom,
        summaryBeforeList: summary.bottom <= list.top,
        contentFits: [...card.querySelectorAll('.demo-composition li, .demo-composition strong, .portfolio-card-bottom a')]
          .every((el) => { const r = el.getBoundingClientRect(); return r.left >= rect.left && r.right <= rect.right; }),
      };
    }));
    expect(layout.every((card) => card.summaryBeforeList && card.contentFits)).toBe(true);
    if (width > 800) {
      for (const card of layout) {
        expect(card.top).toBeCloseTo(layout[0].top, 0);
        expect(card.height).toBeCloseTo(layout[0].height, 0);
        expect(card.ctaBottom).toBeCloseTo(layout[0].ctaBottom, 0);
      }
    } else expect(layout[1].top).toBeGreaterThan(layout[0].top + layout[0].height);
    await expect(page.locator(".pricing-base")).toContainText("Portfolio Base");
    await expect(page.locator(".pricing-base .modular-price")).toContainText("130.000");
    await expect(page.locator('[data-section-type="standard"] .modular-price')).toContainText("30.000");
    await expect(page.locator('[data-section-type="advanced"] .modular-price')).toContainText("65.000");
    await expect(page.locator(".budget-total")).toContainText("220.000");
    await expect(page.locator(".budget-example")).toContainText("3 secciones estándar");
    await expect(page.locator(".base-included-note")).toContainText("No se cobran como secciones independientes");
    await expect(page.locator("body")).not.toContainText(/\b(?:Planes|Esencial|Esenciales|Profesional|Personalizado)\b/);
    await expect(page.locator('.comparison, .product-card, input[type="checkbox"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByText("¿Cómo se calcula el precio de mi portfolio?", { exact: true }).click();
    await expect(page.locator(".faq-list details[open]")).toContainText("130.000");
    await expect(page.locator(".faq-list details[open]")).toContainText("65.000");
    await page.getByText("¿Qué incluye el Portfolio Base?", { exact: true }).click();
    await expect(page.locator(".faq-list details[open]")).toContainText("Una ronda inicial de ajustes");
    await expect(page.locator(".faq-list details[open]")).toHaveCount(1);
    expect(errors).toEqual([]);
    if ([375, 768, 1440].includes(width)) {
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations).toEqual([]);
      await page.getByText("¿Qué incluye el Portfolio Base?", { exact: true }).click();
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty("complete", true);
        expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
      }
      const style = ".site-header, .skip-link { visibility: hidden !important; }";
      await page.locator("#ejemplos").screenshot({ path: `test-results/examples-${width}.png`, style });
      await page.locator("#precios").screenshot({ path: `test-results/pricing-${width}.png`, style });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `test-results/landing-${width}.png`, fullPage: true });
    }
  });
}

test("menú móvil: teclado, Escape, cierre al navegar y enlaces internos", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Navegación móvil" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Navegación móvil" })
    .getByRole("link", { name: "Precios", exact: true })
    .click();
  await expect(page).toHaveURL(/#precios$/);
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  const brokenAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter((link) => !document.querySelector(link.getAttribute("href")))
        .map((link) => link.getAttribute("href")),
    );
  expect(brokenAnchors).toEqual([]);
});

test("assets locales, demos externas, email fallback y tracking desactivado", async ({
  page,
}) => {
  const tracking = [];
  page.on("request", (request) => {
    if (/google-analytics|googletagmanager/.test(request.url()))
      tracking.push(request.url());
  });
  await page.goto("/");
  const images = await page.locator("img").all();
  for (const image of images) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((element) => element.naturalWidth),
    ).toBeGreaterThan(0);
  }
  const demoLinks = page.locator(".portfolio-preview a, .portfolio-card-bottom a");
  await expect(demoLinks).toHaveCount(6);
  for (const link of await demoLinks.all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAttribute("href", /^https:\/\/.+\.vercel\.app\/$/);
  }
  await expect(
    page
      .getByRole("link", { name: "Quiero mi portfolio", exact: true })
      .first(),
  ).toHaveAttribute("href", /^mailto:portfolioslaplata@gmail.com/);
  await expect(
    page.locator('a[href*="wa.me"], a[href*="instagram.com"]'),
  ).toHaveCount(0);
  await expect(page.locator("#site-analytics")).toHaveCount(0);
  expect(tracking).toEqual([]);
});

for (const width of [375, 801, 1440]) {
  test(`CV desde el showcase: teclado, hash, modal e historial a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#ejemplos");
    const cv = page.getByRole("link", { name: "CV descargable", exact: true });
    await cv.focus();
    await expect(cv).toBeFocused();
    expect(await cv.evaluate((el) => {
      const style = getComputedStyle(el);
      return el.matches(':focus-visible') && style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0;
    })).toBe(true);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/secciones#complements$/);
    const target = page.locator("#complements");
    await expect(target).toBeFocused();
    await expect.poll(() => target.evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBeGreaterThanOrEqual(75);
    await expect.poll(() => target.evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBeLessThanOrEqual(105);
    const trigger = page.getByRole("button", { name: "Ver detalle: CV descargable", exact: true });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "CV descargable", exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expect(page).toHaveURL(/\/secciones#complements$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/#ejemplos$/);
    await expect(page.locator("#ejemplos")).toBeFocused();
    await page.goForward();
    await expect(target).toBeFocused();
    await page.reload();
    await expect.poll(() => target.evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBeGreaterThanOrEqual(75);
    await expect.poll(() => target.evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBeLessThanOrEqual(105);
  });
}

test("el HTML de producción contiene el contenido y SEO sin JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4176/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".demo-composition > strong")).toHaveText([
    "5 secciones estándar", "6 secciones estándar", "6 estándar + 2 avanzadas",
  ]);
  await expect(page.locator(".demo-complements")).toHaveText("Complemento: CV descargable");
  await page.getByRole("link", { name: "CV descargable", exact: true }).click();
  await expect(page).toHaveURL(/\/secciones#complements$/);
  await expect(page.locator("#complements")).toContainText("CV descargable");
  await page.goBack();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Portfolios web profesionales/,
  );
  expect(
    JSON.parse(
      await page.locator('script[type="application/ld+json"]').textContent(),
    )["@type"],
  ).toBe("Service");
  await page.locator(".faq-list summary").first().click();
  await expect(page.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  await context.close();
});

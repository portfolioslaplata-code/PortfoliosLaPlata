import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 375, 430, 768, 1024, 1440]) {
  test(`contenido y comparativa sin overflow a ${width}px`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".product-card")).toHaveCount(3);
    await expect(page.locator(".portfolio-card")).toHaveCount(3);
    const essential = page.locator('[data-product="esencial"]');
    const professional = page.locator('[data-product="profesional"]');
    await expect(essential.locator(".portfolio-card")).toHaveCount(2);
    await expect(essential.getByRole("heading", { level: 4 })).toHaveText([
      "Editorial",
      "Minimal",
    ]);
    await expect(essential.locator(".showcase-price")).toContainText("220.000");
    await expect(professional.locator(".showcase-price")).toContainText(
      "350.000",
    );
    await expect(professional.locator(".portfolio-highlights")).toContainText(
      "CV descargable",
    );
    await expect(professional).toHaveClass(/showcase-group-expanded/);
    await expect(page.locator(".portfolio-card .showcase-price")).toHaveCount(
      0,
    );
    await expect(essential.locator("header .showcase-price")).toContainText(
      "220.000",
    );
    await expect(professional.locator("header .showcase-price")).toContainText(
      "350.000",
    );
    await expect(page.locator(".product-section-scope").nth(0)).toContainText(
      "Hasta 4 secciones de contenido",
    );
    await expect(page.locator(".product-section-scope").nth(1)).toContainText(
      "Estándar + Avanzadas",
    );
    await expect(page.locator(".product-section-scope").nth(2)).toContainText(
      "Según tu necesidad y el alcance acordado",
    );
    await expect(page.locator(".content-count-note")).toContainText(
      "no cuentan dentro del límite",
    );
    await expect(page.locator(".product-price").nth(0)).toContainText(
      "220.000",
    );
    await expect(page.locator(".product-price").nth(1)).toContainText(
      "350.000",
    );
    const overflow = () =>
      page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
    expect(await overflow()).toBe(false);
    await page.locator(".section-guide > summary").click();
    await expect(page.locator(".section-types-grid h3")).toHaveText([
      "Secciones estándar",
      "Secciones avanzadas",
      "Secciones a medida",
    ]);
    expect(await overflow()).toBe(false);
    await page
      .getByText("¿Qué cuenta como una sección?", { exact: true })
      .click();
    await expect(page.locator(".faq-list details[open]")).toContainText(
      "no cuentan dentro del límite",
    );
    await page
      .getByText("¿Qué cambia de Esencial a Profesional?", { exact: true })
      .click();
    await expect(page.locator(".faq-list details[open]")).toContainText(
      "Hasta 7 secciones de contenido",
    );
    await page.locator(".comparison > summary").click();
    await expect(page.locator(".comparison")).toHaveAttribute("open", "");
    expect(await overflow()).toBe(false);
    await page.locator(".faq-list summary").first().click();
    await expect(page.locator(".faq-list details").first()).toHaveAttribute(
      "open",
      "",
    );
    await page.locator(".faq-list summary").nth(1).click();
    await expect(page.locator(".faq-list details").first()).not.toHaveAttribute(
      "open",
      "",
    );
    expect(errors).toEqual([]);
    if ([375, 768, 1440].includes(width)) {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
      await page
        .locator(".section-guide")
        .screenshot({
          path: `test-results/section-guide-${width}.png`,
          style: ".site-header, .skip-link { visibility: hidden !important; }",
        });
      await page.locator(".section-guide > summary").click();
      await page.locator(".comparison > summary").click();
      await page.locator(".faq-list summary").nth(1).click();
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty("complete", true);
        expect(
          await image.evaluate((element) => element.naturalWidth),
        ).toBeGreaterThan(0);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `test-results/hero-${width}.png` });
      // Hide fixed/sticky chrome only in section captures to avoid screenshot stitching artifacts.
      const sectionCapture = {
        style: ".site-header, .skip-link { visibility: hidden !important; }",
      };
      await page.locator("#ejemplos").screenshot({
        ...sectionCapture,
        path: `test-results/examples-${width}.png`,
      });
      await professional.screenshot({
        ...sectionCapture,
        path: `test-results/professional-${width}.png`,
      });
      await page.locator("#planes").screenshot({
        ...sectionCapture,
        path: `test-results/pricing-${width}.png`,
      });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `test-results/landing-${width}.png`,
        fullPage: true,
      });
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
    .getByRole("link", { name: "Planes", exact: true })
    .click();
  await expect(page).toHaveURL(/#planes$/);
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
  for (const link of await page.locator(".portfolio-card a").all()) {
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

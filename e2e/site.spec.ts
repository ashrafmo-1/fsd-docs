import { expect, type Page, test } from "@playwright/test";

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

test("home page renders without runtime errors", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Get Started/i }).first(),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("docs pages link to each other through the sidebar", async ({
  page,
  isMobile,
}) => {
  await page.goto("/docs/getting-started");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const sidebar = page.getByRole("navigation", {
    name: "Documentation",
    exact: true,
  });
  await sidebar.getByRole("link", { name: "Project configuration" }).click();
  await expect(page).toHaveURL(/\/docs\/configuration$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Configure once",
  );
  if (!isMobile) {
    await expect(
      page.getByRole("navigation", { name: "Breadcrumb" }),
    ).toContainText("Project configuration");
  }
});

test("copying a code block announces success", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "clipboard permissions are Chromium-only",
  );
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/docs/configuration");
  await page.getByRole("button", { name: "Copy code" }).first().click();
  await expect(page.getByText("Code copied")).toBeAttached();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('"schemaVersion": 1');
});

test("theme switcher applies dark mode and remembers it", async ({ page }) => {
  await page.goto("/docs");
  await page.getByLabel("Color theme").selectOption("dark");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("mobile menu opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "the menu button only exists below the xl breakpoint");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation menu" });
  await toggle.click();
  const menu = page.locator("#mobile-navigation");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Docs" }).click();
  await expect(page).toHaveURL(/\/docs$/);
  await expect(menu).toBeHidden();
});

test("unknown pages return 404 with a way back", async ({ page }) => {
  const response = await page.goto("/docs/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Browse documentation" }),
  ).toBeVisible();
});

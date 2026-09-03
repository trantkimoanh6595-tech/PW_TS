import { test, expect, Page, Locator, BrowserContext } from "@playwright/test";

test.describe.serial("bài 4 phần 2", () => {
  let page: Page;
  let context: BrowserContext;
  let mouseHoverEfects: Locator;

  async function gotoPage(page: Page) {
    await page.goto("https://lab.autoneko.com/");
    await page
      .getByRole("link", {
        name: "Bài 4: User Actions & Form Handling",
        exact: true,
      })
      .click();
    await page.getByRole("tab", { name: "🖱️ Mouse Actions" }).click();
    const panel = page.getByRole("tabpanel", { name: "🖱️ Mouse Actions" });
    return {
      panel,
      mouseHoverEfects: panel.locator("#mouse-hover-effects"),
    };
  }

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const pageObject = await gotoPage(page);
    mouseHoverEfects = pageObject.mouseHoverEfects;
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("TC01 Delayed Tooltip", async () => {
    const delayedTooltip = mouseHoverEfects.locator(
      "#mouse-delayed-tooltip-target",
    );
    await expect(delayedTooltip).toBeVisible();
    await delayedTooltip.hover();

    const tooltp = page
      .getByRole("tooltip")
      .filter({ hasText: "Tooltip này hiện sau 2 giây hover liên tục" });
    await expect(tooltp).toBeVisible();
    await expect(tooltp).toHaveText(
      "Tooltip này hiện sau 2 giây hover liên tục",
    );
  });
  test("TCs02 Persistent Tooltip ", async () => {
    const persistentToooltip = mouseHoverEfects.locator(
      "#mouse-persistent-tooltip-target",
    );
    const tooltip = page
      .getByRole("tooltip")
      .filter({ hasText: "Tooltip này chỉ ẩn sau 5 giây kể từ lúc rời chuột" });

    await expect(persistentToooltip).toBeVisible();
    await persistentToooltip.hover();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText(
      "Tooltip này chỉ ẩn sau 5 giây kể từ lúc rời chuột",
    );
  });
  test("TC03 Multi Animation", async () => {
    const multiAnimation = mouseHoverEfects
      .getByText("Multi Animation", { exact: true })
      .locator(
        "xpath=ancestor::div[contains(concat(' ', normalize-space(@class), ' '), ' ant-card ')][1]",
      );

    await expect(multiAnimation).toBeVisible();
    await multiAnimation.hover();
    await expect(multiAnimation).toHaveAttribute(
      "style",
      /transform:\s*scale\(1\.05\)\s*rotate\(2deg\)/,
    );
  });
  test("TC04", async () => {
    const zoomIn = mouseHoverEfects
      .locator(".ant-card")
      .filter({ hasText: /^Zoom InScale \+ Shadow$/ });
    await expect(zoomIn).toHaveCount(1);
    await expect(zoomIn).toHaveCSS(
      "transform",
      /none|matrix\(1, 0, 0, 1, 0, 0\)/,
    );
    await zoomIn.hover();
    await expect(zoomIn).toHaveCSS("box-shadow", /rgba\(0, 0, 0, 0\.15\)/);
  });
});

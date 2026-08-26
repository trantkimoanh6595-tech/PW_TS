import { test, expect, Page, Locator, BrowserContext } from "@playwright/test";

test.describe.serial("🚀 Advanced Click Scenarios", () => {
  let page: Page;
  let context: BrowserContext;
  let advanceClickScreanario: Locator;
  async function gotoPage(page: Page) {
    await page.goto("https://lab.autoneko.com/");
    await page.getByRole("link", { name: "Tổng quan khóa học" }).click();
    await page
      .getByRole("link", { name: "Mở Bài 4: User Actions & Form Handling" })
      .click();
    await page.getByRole("tab", { name: "🖱️ Mouse Actions" }).click();
    const panel = page.getByRole("tabpanel", { name: "🖱️ Mouse Actions" });
    const advanceClickScreanario = panel.locator("#advanced-click-card");
    return {
      panel,
      advanceClickScreanario,
    };
  }
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const pageObject = await gotoPage(page);
    advanceClickScreanario = pageObject.advanceClickScreanario;
  });

  test.afterAll(async () => {
    await context.close();
  });

  test("TC01 Select 3 Work Files ", async () => {
    const buttonSelect = advanceClickScreanario.locator("#ac-select-docs");
    await buttonSelect.click();
    await expect(
      advanceClickScreanario.locator("#ac-selected-count-advanced"),
    ).toHaveText("Selected: 3 items");
  });
  test("TCs02 Process Select", async () => {
    const processButton = advanceClickScreanario.locator("#ac-process");
    await expect(processButton).toBeEnabled();
    await processButton.click();
    const processAlert = advanceClickScreanario.getByRole("alert");
    await expect(processAlert).toContainText("Processing Complete!");
    await expect(processAlert).toContainText(
      "Processed 3 items: 📄 Document.pdf, 🖼️ Image.jpg, 📊 Report.xlsx",
    );
  });
  test("TCS03 Select Media", async () => {
    const selecMediaButton = advanceClickScreanario.locator("#ac-select-media");
    await selecMediaButton.click();
    await expect(
      advanceClickScreanario.locator("#ac-process-docs"),
    ).toBeDisabled();
    await expect(advanceClickScreanario.locator("#ac-process-docs")).toHaveText(
      "❌ Media files not allowed",
    );
    await expect(
      advanceClickScreanario.getByRole("button", { name: "🎵 Music.mp3 ✓" }),
    ).toBeEnabled();
    await expect(
      advanceClickScreanario.getByRole("button", { name: "📹 Video.mp4 ✓" }),
    ).toBeEnabled();
    await expect(advanceClickScreanario.locator("#ac-process")).toBeEnabled();
    const d2fButton = advanceClickScreanario.locator("#ac-download");
    await expect(d2fButton).toBeEnabled();
    await expect(d2fButton).toHaveText("Download 2 files");
    await d2fButton.click();
    await expect(
      advanceClickScreanario.locator("#ac-download-result"),
    ).toBeVisible();
    await expect(
      advanceClickScreanario.locator("#ac-download-result"),
    ).toContainText("✅ Downloaded 1");
  });
  test("TC04", async () => {
    const d2fButton = advanceClickScreanario.locator("#ac-download");
    const actionClick = 4;
    const resertButton = advanceClickScreanario.locator("#ac-download-result");

    for (let i = 2; i <= actionClick; i++) {
      await d2fButton.click();
      await expect(resertButton).toHaveText(`✅ Downloaded ${i} batches`);
    }
  });
  test("TCs05 Acchive Button", async () => {
    const dialog = page.getByRole("dialog");
    await advanceClickScreanario.locator("#ac-select-all").click();
    await advanceClickScreanario.locator("#ac-archive").click();
    await expect(page.getByRole("dialog")).toContainText(
      "📦 Archive created with 5 files!",
    );
    await dialog.getByRole("button", { name: "Đóng" }).click();
    await expect(dialog).toBeHidden();
  });
});

import { test, expect } from "@playwright/test";

test.describe("Test keyboard", () => {
  test("Tcs01", async ({ page }) => {
    await page.goto("https://lab.autoneko.com/");
    await page
      .getByRole("link", {
        name: "Bài 4: User Actions & Form Handling",
        exact: true,
      })
      .click();
    await page.getByRole("tab", { name: "⌨️ Keyboard Actions" }).click();
    const keyFuntion = page.locator("#keyboard-function-keys");
    const keyInphut = keyFuntion.locator("#keyboard-function-input");
    await keyInphut.fill("1 ");
    await expect(keyFuntion.locator("#keyboard-function-line")).toHaveText(
      "Line: 1",
    );
    await expect(keyFuntion.locator("#keyboard-function-column")).toHaveText(
      "Column: 3",
    );
    await expect(keyFuntion.locator("#keyboard-function-length")).toContainText(
      "2",
    );
    await keyInphut.press("Enter");
    await expect(keyFuntion.locator("#keyboard-function-line")).toHaveText(
      "Line: 2",
    );
    await keyInphut.press("Backspace");
    await keyInphut.press("Space");
    await keyInphut.press("ArrowRight");
    await keyFuntion.press("Tab");
    const strategeKey = page.locator("#keyboard-text-strategies");
    const keyStraText = strategeKey.locator("#keyboard-text-strategy-area");
    await keyStraText.pressSequentially("abcS");
  });
});

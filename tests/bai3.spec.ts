import { test, expect } from "@playwright/test";

test("Xpath selection", async ({ page }) => {
  await page.goto("https://lab.autoneko.com/");
  await page
    .getByRole("link", {
      name: "Bài 1: Locators từ CSS đến getBy",
      exact: true,
    })
    .click();
  await page.getByRole("button", { name: "CSS Selector" }).click();
  await page.getByRole("button", { name: "Bài tập", exact: true }).click();
  // await page.locator('//input[@name="email"]').fill('oanh@gmail.com')
  // await page.locator('////button[@data-action="submit"]').highlight()
  // await page.pause()
});

import { test, expect, Page, Locator } from "@playwright/test";

test.describe("Bai 4", () => {
  async function pageGoto(page: Page) {
    const urlpage = "https://lab.autoneko.com/";
    await page.goto(urlpage);
    await page
      .getByRole("link", {
        name: "Bài 4: User Actions & Form Handling",
        exact: true,
      })
      .click();
    await page.getByRole("tab", { name: "🖱️ Mouse Actions" }).click();
    const panel = page.getByRole("tabpanel", { name: "🖱️ Mouse Actions" });
    await expect(panel).toBeVisible();

    return {
      panel,
      mouseAction: panel.locator("#mouse-click-actions"),
      mouseHoverEfects: panel.locator("#mouse-hover-effects"),
    };
  }
  test("Kiem tra UI man hinh", async ({ page }) => {
    const { mouseAction, mouseHoverEfects } = await pageGoto(page);

    await test.step("Tcs01", async () => {
      const hoverTime = 2;
      const hoverTaget = mouseHoverEfects.locator("#mouse-hover-target");
      const hoverCount = mouseHoverEfects.locator("#mouse-hover-count");
      await expect(hoverTaget).toBeVisible();
      //UI1: Card 'Hover over me' và bộ đếm locator
      // await expect(mouseHoverEfects.panel.locator('#mouse-hover-target')).toBeVisible();
      // await mouseHoverEfects.panel.locator('#mouse-hover-target').hover();
      // await expect(mouseHoverEfects.panel.locator('#mouse-hover-count')).toHaveText('Hover Count: 1');
      // await page.mouse.move(0,0);
      // await mouseHoverEfects.panel.locator('#mouse-hover-target').hover();

      // await expect(mouseHoverEfects.panel.locator('#mouse-hover-count')).toHaveText('Hover Count: 2');

      for (let index = 1; index <= hoverTime; index++) {
        await hoverTaget.hover();

        await expect(hoverCount).toHaveText(`Hover Count: ${index}`);
        await page.mouse.move(0, 0);
      }
    });

    await test.step("TC02", async () => {
      await expect(mouseAction.locator("#mouse-basic-click-btn")).toBeVisible();
      await mouseAction.locator("#mouse-basic-click-btn").click();
      await expect(mouseAction.locator("#mouse-basic-click-count")).toHaveText(
        "Click Count: 1",
      );

      // await expect(mouseAction.locator('#mouse-basic-click-btn')).toBeVisible();
      // await mouseAction.locator('#mouse-basic-click-btn').click();
      // await expect(mouseAction.locator('#mouse-basic-click-count')).toHaveText('Click Count: 1');
    });
    await test.step("TCs03", async () => {
      // const { mouseAction } = await pageGoto(page);
      await expect(mouseAction.locator("#mouse-right-click-btn")).toBeVisible();
      await mouseAction
        .locator("#mouse-right-click-btn")
        .click({ button: "right" });
      await expect(mouseAction.locator("#mouse-right-click-count")).toHaveText(
        "Right Click Count: 1",
      );
    });
    await test.step("TC04 dbClick", async () => {
      // const { mouseAction } = await pageGoto(page);
      await expect(
        mouseAction.locator("#mouse-double-click-btn"),
      ).toBeVisible();
      await mouseAction.locator("#mouse-double-click-btn").dblclick();
      await expect(mouseAction.locator("#mouse-double-click-count")).toHaveText(
        "Double Click Count: 1",
      );
    });
    await test.step("TC05 toolip", async () => {
      // const { mouseHoverEfects } = await pageGoto(page);
      await mouseHoverEfects.locator("#mouse-tooltip-target").hover();
      await expect(page.getByRole("tooltip")).toContainText(
        "Đây là tooltip thực tế",
      );
    });
    await test.step("TCs06 single Toolip", async () => {
      // const { mouseHoverEfects } = await pageGoto(page);
      await mouseHoverEfects.getByRole("img", { name: "check-circle" }).hover();
      await expect(
        page.getByRole("tooltip", { name: "Tooltip với placement khác" }),
      ).toContainText("Tooltip với placement khác nhau");
    });
    await test.step("TCs07", async () => {
      // const { mouseHoverEfects } = await pageGoto(page);
      await mouseHoverEfects
        .getByRole("button", { name: "Tooltip Top", exact: true })
        .hover();
      await expect(
        page.getByRole("tooltip", { name: "Tooltip 1: Placement top" }),
      ).toBeVisible();
    });
    await test.step("TCs08", async () => {
      // const { mouseHoverEfects } = await pageGoto(page);
      await mouseHoverEfects
        .getByRole("button", { name: "Tooltip Bottom", exact: true })
        .hover();
      await expect(
        page.getByRole("tooltip", { name: "Tooltip 2: Placement bottom" }),
      ).toBeVisible();
    });
    await test.step("TCs09 toolip Right", async () => {
      const { mouseHoverEfects } = await pageGoto(page);
      await mouseHoverEfects
        .getByRole("button", { name: "Tooltip Left", exact: true })
        .hover();
      await expect(
        page.getByRole("tooltip", { name: "Tooltip 3: Placement left" }),
      ).toBeVisible();
    });
    await test.step("TCs10 toolip right", async () => {
      // const { mouseHoverEfects } = await pageGoto(page);
      await mouseHoverEfects
        .getByRole("button", { name: "Tooltip Right", exact: true })
        .hover();
      await expect(
        page.getByRole("tooltip", { name: "Tooltip 4: Placement right" }),
      ).toBeVisible();
    });
    await test.step("TC11 Advance hover screnarios", async () => {
      await expect(
        mouseHoverEfects.getByTestId("hover-sequence-card-a"),
      ).toBeVisible();

      await mouseHoverEfects.getByTestId("hover-sequence-card-a").hover();
      await page.mouse.move(0, 0);
      await expect(
        mouseHoverEfects.getByTestId("hover-sequence-card-a"),
      ).toContainText("✅ Already hovered");
    });
    await test.step("TC12 CardB", async () => {
      await expect(
        mouseHoverEfects.getByTestId("hover-sequence-card-b"),
      ).toBeVisible();
      await mouseHoverEfects.getByTestId("hover-sequence-card-b").hover();
      await page.mouse.move(0, 0);
      await expect(
        mouseHoverEfects.getByTestId("hover-sequence-card-b"),
      ).toContainText("✅ Already hovered");
    });
    await test.step("TC12 card C", async () => {
      await expect(
        mouseHoverEfects.getByTestId("hover-sequence-card-c"),
      ).toBeVisible();
      await mouseHoverEfects.getByTestId("hover-sequence-card-c").hover();
      await page.mouse.move(0, 0);
      await expect(
        mouseHoverEfects.getByTestId("hover-sequence-card-c"),
      ).toContainText("✅ Already hovered");
    });
    await test.step("TC13 card", async () => {
      const cardD = mouseHoverEfects.getByTestId("hover-sequence-card-d");
      await expect(cardD).toBeVisible();
      await cardD.hover();
      await page.mouse.move(0, 0);
      await expect(cardD).toContainText("✅ Already hovered");
    });
    await test.step("Reset", async () => {
      const totalCard = [
        { name: "Card A", testId: "hover-sequence-card-a" },
        { name: "Card B", testId: "hover-sequence-card-b" },
        { name: "Card C", testId: "hover-sequence-card-c" },
        { name: "Card D", testId: "hover-sequence-card-d" },
      ];

      for (const carData of totalCard) {
        await test.step(`hover ${carData.name}`, async () => {
          const card = page.getByTestId(carData.testId);
          await expect(card).toBeVisible();
          await card.hover();
          await expect(card).toContainText("✅ Already hovered");
          await page.mouse.move(0, 0);
        });
      }

      await test.step("Nhấn nút restButton", async () => {
        const restButton = mouseHoverEfects.getByRole("button", {
          name: "Reset",
        });
        await expect(restButton).toBeVisible();
        await restButton.click();
      });
      for (const carData of totalCard) {
        await test.step(`Kiem tra ${carData.name}`, async () => {
          const card = page.getByTestId(carData.testId);
          await expect(card).toBeVisible();
          await expect(card).toContainText("Hover me");
          await expect(card).not.toContainText("✅ Already hovered");
        });
      }
    });
    await test.step("TC13 Context Menu on Hover", async () => {
      const rightClickTarget = page.locator("#hover-context-menu-target");
      const menu = page.getByRole("menu", { name: "Hover context menu" });
      const dialog = page.getByRole("dialog", { name: "Kết quả" });

      const itemInMenu = [
        {
          name: "Coppy",
          itemName: /📋 Copy/,
          expectPopUp: "✅ Copy action completed successfully!",
        },
        {
          name: "Edit",
          itemName: /✏️ Edit/,
          expectPopUp: "✅ Edit action completed successfully!",
        },
        {
          name: "Delete",
          itemName: /🗑️ Delete/,
          expectPopUp: "✅ Delete action completed successfully!",
        },
      ];
      await expect(rightClickTarget).toBeVisible();

      for (const item of itemInMenu) {
        await test.step(`Click ${item.name}`, async () => {
          await rightClickTarget.evaluate((element) => {
            element.scrollIntoView({
              block: "center",
              inline: "center",
            });
          });

          await expect(rightClickTarget).toBeVisible();

          await rightClickTarget.click({
            button: "right",
            position: {
              x: 10,
              y: 10,
            },
          });

          await expect(menu).toBeVisible();

          const menuItem = menu.getByRole("menuitem", { name: item.itemName });
          await expect(menuItem).toBeVisible();
          await menuItem.click();

          //kiểm tra menu đã đóng
          await expect(menu).toBeHidden();
          await expect(dialog).toContainText(item.expectPopUp);

          //đóng popup
          const closeButton = dialog.getByRole("button", {
            name: "Đóng",
            exact: true,
          });
          await expect(closeButton).toBeVisible();
          await closeButton.click();
          await expect(dialog).toBeHidden();
        });
        // const cancelButton = dialog.getByRole("button", {
        //   name: "Hủy",
        //   exact: true,
        // });
        // await expect(cancelButton).toBeVisible();
        // await cancelButton.click();
        // await expect(dialog).toBeHidden();
      }
    });

    await test.step("TC14 Context Menu on Hover", async () => {
      const rightClickTarget = page.locator("#hover-context-menu-target");
      const menu = page.getByRole("menu", { name: "Hover context menu" });
      const dialog = page.getByRole("dialog", { name: "Kết quả" });

      const itemInMenu = [
        {
          name: "Coppy",
          itemName: /📋 Copy/,
          expectPopUp: "✅ Copy action completed successfully!",
        },
        {
          name: "Edit",
          itemName: /✏️ Edit/,
          expectPopUp: "✅ Edit action completed successfully!",
        },
        {
          name: "Delete",
          itemName: /🗑️ Delete/,
          expectPopUp: "✅ Delete action completed successfully!",
        },
      ];
      await expect(rightClickTarget).toBeVisible();

      for (const item of itemInMenu) {
        await test.step(`Click ${item.name}`, async () => {
          await rightClickTarget.evaluate((element) => {
            element.scrollIntoView({
              block: "center",
              inline: "center",
            });
          });

          await expect(rightClickTarget).toBeVisible();

          await rightClickTarget.click({
            button: "right",
            position: {
              x: 10,
              y: 10,
            },
          });

          await expect(menu).toBeVisible();

          const menuItem = menu.getByRole("menuitem", { name: item.itemName });
          await expect(menuItem).toBeVisible();
          await menuItem.click();

          //kiểm tra menu đã đóng
          await expect(menu).toBeHidden();
          await expect(dialog).toContainText(item.expectPopUp);
          const cancelButton = dialog.getByRole("button", {
            name: "Hủy",
            exact: true,
          });
          await expect(cancelButton).toBeVisible();
          await cancelButton.click();
          await expect(dialog).toBeHidden();
        });
      }
    });
  });
});

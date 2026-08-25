import { test, expect } from '@playwright/test';
import{page} from '@playwright/test';

const DEMO_URL= 'https://demoapp-sable-gamma.vercel.app/';

// test('Cac cap do test', async ({ page }) => {

// await page.goto(DEMO_URL)
// await page.getByRole('link',{name:'Bài 1: Auto-Wait Demo'}).click()
// await page.locator("//span[text()='📚 Auto-Waiting']").click()
// await page.locator("//span[text()='🚀 Bắt đầu Test']").click()

// const slowButton1 =page.locator('#button-1')
// await slowButton1.click({timeout:6000})
// })


// test.setTimeout(30000);
// test('cap 2',async({page}) => {
//     await page.goto(DEMO_URL)
//     await page.getByRole('link',{name:'Bài 1: Auto-Wait Demo'}).click()
//     await page.locator("//span[text()='📚 Auto-Waiting']").click()
//     // await page.locator("//span[text()='🚀 Bắt đầu Test']").click()

//     const startButton= page.locator("#start-btn");
//     const continueButton = page.locator("#continue-btn");
//     const finalButton= page.locator("#final-btn");
//     await startButton.click();

//     await continueButton.click();

//     await finalButton.click();

    

    // const slowButton2= page.locator('#button-2')
    // await slowButton2.click()


// test('Web-first Assertions',async({page}) =>{
//     await page.goto(DEMO_URL)
//     await page.getByRole('link',{name:'Bài 1: Auto-Wait Demo'}).click()
//     await page.locator("//span[text()='🚀 Web-First Assertions']").click()
//     await page.locator("//span[text()='Bắt đầu chờ']").click()
//     const statusMess= page.locator("#status-message")

//     await expect (statusMess).toHaveText('Tải dữ liệu thành công!',{timeout:8000});

test('Await expected',async({page}) =>{
    await page.goto(DEMO_URL)
    await page.getByRole('link',{name:'Bài 1: Auto-Wait Demo'}).click()
    await page.locator("//span[text()='⏱️ expect() có await']").click()
    // await page.locator("#btn-attach").click()
    // await expect(page.locator("#attached-container")).toBeAttached();

    await page.locator("#btn-hide").click()
    await expect(page.locator("#visibility-target")).toBeHidden()
    await page.locator("#btn-show").click()
    await expect(page.locator("#visibility-target")).toBeVisible()
    await page.locator("#news-check").click()
    await expect(page.locator("#news-check")).toBeChecked()

    await page.locator("#toggle-disabled").click()
    await expect(page.locator("#email")).toBeDisabled()
    
    await page.locator("#toggle-enabled").click()
    await page.locator("#toggle-enabled").click()

    await expect(page.locator("#enabled-input")).toBeEnabled()
    // await page.locator("#ant-space-item").click()
    await expect(page.locator("#editable")).toBeEditable()
    await page.locator("#btn-clear").click()
    await expect(page.locator("#empty-box")).toBeEmpty()

    
    // const demso= page.locator("#count-display")
    //  console.log(await demso.count())
     await page.locator("#btn-add-item").click()
    await expect(page.locator("#items li")).toHaveCount(3)
    await page.locator("#btn-set-complex-text").click()
    await expect(page.locator(".ant-space-item #text-container")).toContainText("john")
    await page.locator("#btn-focus").click()
    await expect(page.locator("#focusable")).toBeFocused()
    await page.locator("//span[text()='Set Value']").click()
    await expect(page.locator("#value-input")).toHaveValue("Hello World")
    
    await page.locator("//span[text()='Set Values']").click()
    await expect(page.locator("#multi-select")).toHaveValues(['Action','Drama'])

    await page.locator("#btn-toggle-attr").click()
    await expect(page.locator("#avatar")).toHaveAttribute('alt', 'User Avatar')

    await page.locator('#viewport-target').scrollIntoViewIfNeeded();
    await expect(page.locator("#viewport-target")). toBeInViewport();

    // await page.pause()


})





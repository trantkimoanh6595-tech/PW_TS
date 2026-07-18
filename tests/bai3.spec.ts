import { test, expect } from '@playwright/test';

test('Vai tro mac dinh', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
    await page.getByRole('button', { name: 'Playwright getByRole' }).click()
    //page.getByRole('button', {name: "Trang chủ"})
    // await page.getByRole('button', { name: 'Lưu' }).click()
    // // await page.getByRole('button', { name: 'Hủy' }).click()
    await page.getByRole('button', { name: 'Gửi' })

    // console.log((await page.getByRole('button', { name: 'Gửi' })))
    
    // await page.getByRole('textbox', { name: 'Tên:' }).fill('Oanh')

    const linkLocator = page.getByRole('link', { name: 'Trang chủ' })
    const buttonLocator =page.getByRole('button', {name: 'Gửi'})

    // await linkLocator.hideHighlight()
    // console.log('se co bao nhieu phan tu', await linkLocator.count())
    // await linkLocator.nth(0).hover()
    // await linkLocator.hover()
    // await page.getByRole('checkbox', {name:'Đồng ý điều khoản'}).check()
     await page.getByRole('button', { name: 'Gửi' })
     await buttonLocator.nth(0).hover()
    await page.pause()
});

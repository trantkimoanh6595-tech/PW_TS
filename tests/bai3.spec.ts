import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

// test('Vai tro mac dinh', async ({ page }) => {
//     await page.goto('https://demoapp-sable-gamma.vercel.app/')
//     await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
//     await page.getByRole('button', { name: 'CSS Selector' }).click()
//     // page.getByRole('button', {name: "Bài tập"})
//     // // await page.getByRole('button', { name: 'Lưu' }).click()
//     // await page.getByRole('button', { name: 'Bold' }).click()
//     // await page.getByRole('button', { name: 'Gửi' })
//     // await page.getByAltText('image').click()

//     // console.log((await page.getByRole('button', { name: 'Gửi' })))

//     // await page.getByRole('textbox', { name: 'Tên:' }).pressSequentially('Oanh') //=> nhập chữ , còn fill thì bỏ luôn tên oanh

//     const linkLocator = page.getByRole('link', { name: 'Trang chủ' })
//     const buttonLocator =page.getByRole('button', {name: 'Bold'})

//     // await linkLocator.hideHighlight()
//     // console.log('se co bao nhieu phan tu', await linkLocator.count())
//     // await linkLocator.nth(0).hover()
//     await linkLocator.hover()
//     // await page.getByRole('checkbox', {name:'Đồng ý điều khoản'}).check()
//     //  await page.getByRole('button', { name: 'Gửi',disabled: true})
//     //  console.log(`tong s button disable là: ${await buttonLocator.count()}`);
//     //  await buttonLocator.nth(1).hover()
//     await page.pause()
// });

// async function testbaitap(page: Page) {

//     await page.goto('https://demoapp-sable-gamma.vercel.app/')
//     await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click()
//     await page.getByRole('button', { name: 'Playwright getByRole' }).click()
//     const buttonLocator = page.getByRole('button', { name: 'Bài tập' })
//     await buttonLocator.nth(1).click()
//     console.log(`in ra ket qua test`)
// }

// test.describe('Bai Tap', () => {

//     test('Bai tap 1', async ({ page }) => {
//         await testbaitap(page)
//         await page.getByRole('button', { name: 'Bold', pressed: true }).hover()
//         await page.getByRole('button', { name: 'More options' }).click()
//         await page.getByRole('menuitem', { name: 'Duplicate' }).click()
//         await page.getByRole('button', { name: 'More options' }).click()
//         await expect(page.getByRole('menuitem', { name: 'Download (disabled)' })).toBeDisabled()
//         await page.getByRole('combobox', { name: 'Font family' }).click()
//         // await page.getByRole('option', { name: 'Roboto' }).click()
//         await expect(page.getByRole("option", { name: "Roboto" })).toBeVisible();
//         await page.getByRole("option", { name: "Roboto" }).click();
//         await page.getByRole('textbox', { name: 'Tiêu đề' }).pressSequentially("Bài viết mới")
//         await expect(page.getByRole('button', { name: 'Publish' })).toBeDisabled()
//     });



//     test('Bai tap 2', async ({ page }) => {
//         await testbaitap(page)
//         await page.getByRole('heading', { name: 'Câu 1: Landmark Navigation "Primary' })
//         await expect(page.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'page');
//         await page.getByRole('textbox', { name: "Search docs" }).fill('Search docs')
//         await page.getByRole('textbox', { name: 'Mã nội bộ' }).fill('Mã nội bộ')
//         await page.getByRole('button', { name: 'Tải dữ liệu' }).click()
//         await expect(page.getByText('Đã tải 3 kết quả')).toBeVisible()


//     });

//     test('Bai tap 3', async ({ page }) => {
//         await testbaitap(page)
//         await page.getByRole('button', { name: 'Load comments' }).click()



//         const comments = page
//             .getByRole('region', { name: 'Comments' })
//             .getByRole('list')
//             .getByRole('listitem');

//         const vitri = await page.getByRole('listitem').nth(2)

//         await expect(comments).toHaveCount(3);
//         await vitri.click()
//     });


//     test('Bai tap 4', async ({ page }) => {
//         await testbaitap(page)
//         const delecButton = page.getByRole('button', { name: 'Self remove' })
//         await delecButton.click()
//         await expect(delecButton).toHaveCount(0)
//         await expect(page.getByRole('button', { name: 'Danger submit' })).toBeDisabled()
//         await expect(page.getByRole('textbox', { name: 'Readonly token' })).toHaveAttribute('readonly', '')
//         await page.getByRole('button', { name: 'Trigger error' }).click()
//         await expect(page.getByRole('alert')).toBeVisible()


//         // await page.pause()
//         // await testbaitap(page)
//         // await page.getByRole('button', {name:'Load comments'}).click()
//         // await expect(page.getByRole('region',{name:'Comments'})).toHaveAttribute('aria-busy','false')
//         // // await page.getByRole('listitem')
//         // await expect(page.getByRole('listitem')).toHaveCount(3)
//         // // await page.pause()


//     });







// })

async function testBaiTapNangCao(page:Page) {
    await page.goto('https://demoapp-sable-gamma.vercel.app/')
    await page.getByRole('link',{name:'Bài 2: Playwright Locators'}).click()
    await page.getByRole('button', {name:'Playwright getBy Nâng cao'}).click()
}
test.describe('Bai tap nang cao', () => {

    test('Test bai getBylabel',async ({page}) => {
       await testBaiTapNangCao(page)
       await page.getByLabel('Email').fill('Oanh.ttk@gmail.com')
    //    await page.getByRole('textbox', {name:"Email:"}).fill('Oanh.ttk@gmail.com')
       await page.getByLabel('Mật khẩu').fill('1234o6')
    //    await page.getByRole('textbox',{name:'Mật khẩu:'}).fill('1234o6')
       await page.getByLabel('Ghi nhớ đăng nhập').check()
       await page.getByPlaceholder('Tìm kiếm sản phẩm...').fill('ABD')
       await page.getByPlaceholder('Nhập email của bạn').fill('Oanh@1234gmail.com')
       await page.getByPlaceholder('Nhập tin nhắn...').fill('Cố gắng lên')

       const butonLogin= page.getByText('Đăng nhập')
       await butonLogin.nth(0).click()
       
    //    await page.getByText('Đăng nhập')
       await page.getByText('Quên mật khẩu?',  { exact: true }).click()
       await page.getByText('Chào mừng bạn!')
       await page.getByText('/Lỗi:/')

    })


    test('Test getByAltText', async ({page}) => {
        await testBaiTapNangCao(page)
        await page.getByAltText('Logo công ty').click()
        await page.getByAltText('iphone 15 Pro').click()


    })


    //    await page.pause()




    })


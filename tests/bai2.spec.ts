import { test, expect } from '@playwright/test';
import {perfomance} from 'node:perf_hooks'


// // test('test vao trang playwright.dev',async({page}) => {
// //   await page.goto('https://playwright.dev/');
// //   await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
// // });
const TAGET_URL = 'https://playwright.dev'
// test.describe('trang chu playwright.dev',() => {
  test.only('TC01. dEMO Domcontentloaded',async({page}) => {
    console.log('DEMO WAIT UNTIL- Domcontentloaded')
   await page.goto('https://playwright.dev/');

   await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
 });

//   test('TC02. Check URL cua trang hien thi',async({page}) => {
//    await page.goto('https://playwright.dev/');
//    await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');
//  });
// })
// })
// //https://hrm.anhtester.com/erp/desk
// test.describe('trang nhan su anhtester', () => {
//   test('TC01. kich ban dang nhap va kiem tra widget', async ({ page }) => {

//     await test.step('Buoc 1: Dieu huong va dang nhap', async () => {
//       await page.goto('https://hrm.anhtester.com/');

//         await page.goto('https://hrm.anhtester.com/erp/login');
//         await page.getByRole('textbox', { name: 'Your Username' }).click();
//         await page.getByRole('textbox', { name: 'Your Username' }).fill('admin_example');
//         await page.getByRole('textbox', { name: 'Enter Password' }).click();
//         await page.getByRole('textbox', { name: 'Enter Password' }).fill('123456');
//         await page.getByRole('button', { name: ' Login' }).click();
//       })

//       await test.step('Buoc 2: Kiem tra dang nhap thanh cong', async () => {

//       //  await page.getByRole('heading', { name: 'Logged In Successfully.' }).click()

//         await expect(page.getByRole('heading', { name: 'Logged In Successfully.'})).toBeVisible

//         // expect(page.url()).toBe('https://hrm.anhtester.com/erp/desk');
//         // const url = page.url()
//         // console.log(url);\
//         // interval 5s tu dong
//       })
//     });
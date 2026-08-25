import { test, expect } from '@playwright/test';

const urlWeb='https://lab.autoneko.com/'
test('bai3',async({page}) =>{
await page.goto(urlWeb)
await page.getByRole('link',{name:'Bài 3: Text Methods & Assertions',exact:true}).click()
await page.getByRole('tab',{name:'✅ Expect Assertions'}).click()

// const panel= await page.getByRole('tab',{name:'✅ Expect Assertions'});
const dashboad = page.getByTestId('lesson3-ecommerce-dashboard');
const productCard= dashboad.getByTestId('ecommerce-product-card')
await expect(productCard).toHaveCount(3)
await expect(page.locator('#cart-total')).toHaveText('$1,647')
await expect(page.locator('#order-status')).toHaveText('Processing')
await expect(dashboad.getByTestId('ecommerce-category-tag')).toHaveCount(3)
// await expect(dashboad.locator('#in-stock-flag')).toHaveAttribute('data-value','true')
await expect(dashboad.locator('#in-stock-flag').getAttribute('data-value')).toBeTruthy()
expect(await dashboad.locator('#sold-out-flag').getAttribute('data-value')).toBeFalsy() //.toHaveAttribute('data-value', ''))
// console.log(await dashboad.locator('#in-stock-flag').getAttribute('data-value'),111)


await expect(dashboad.filter({hasText:'Apple Watch Series 9'})).toBeVisible();
// console.log(await page.getByTestId('ecommerce-product-card').filter({hasText:'Apple Watch Series 9'}).innerText())
await expect(dashboad.filter({hasText:'AirPods Pro'})).toBeVisible()
await expect(dashboad.filter({hasText:'iPhone 15 Pro'})).toBeVisible()

const ar1= await dashboad.allInnerTexts()
expect(await dashboad.allInnerTexts()).toHaveLength(1)
    //  expect(await dashboad.allInnerTexts).toHaveLength(3)

const json1= {
  "id": 101,
  "role": "student",
  "active": true,
  "premium": false
};
const json2= await page.locator('#profile-json').innerHTML()
console.log(json2);
expect(json1).toEqual(JSON.parse(json2))


})
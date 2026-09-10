import { test, expect } from '@playwright/test';


test.describe('bai 7', () => {


    test('TCS 01: Kiem tra UI san pham noi bat', async ({ page }) => {
        const urlpage = 'https://lab.autoneko.com/'
        const panel1 = page.getByRole('tabpanel', { name: '✅ Expect Assertions' });
        const dashboad1 = panel1.getByTestId('lesson3-ecommerce-dashboard');
        const productCard = dashboad1.getByTestId('ecommerce-product-card');

        await page.goto(urlpage)
        await page.getByRole('link', { name: 'Bài 3: Text Methods & Assertions', exact: true }).click()
        await page.getByRole('tab', { name: '✅ Expect Assertions' }).click()

        await expect(productCard).toHaveCount(3);
        const A = await productCard.count()
        // console.log(await A)
        // // const phoncard1= page.getByTestId('ecommerce-product-card').filter({hasText:'iPhone 15 Pro'})
        // // const IMG1= page.getByAltText('iPhone 15 Pro')
        // const product1= page.locator('#product-1')

        // await expect(product1).toBeVisible()
        // // await expect(IMG1).toBeVisible()

        const productDatas: Array<{ name: string; price: number; sku: string; category: string; badge: string; button: string; buttonHeart: string }> = [];

        // get product JSON 
        for (let i = 0; i < A; i++) {
            const card = productCard.nth(i)
            const name = (await card.getAttribute('data-name') ?? '')
            const price = (Number(await card.getAttribute('data-price')) ?? 0)
            const sku = (await card.getAttribute('data-sku') ?? '')
            const category = (await card.getAttribute('data-category') ?? '')
            const badge = (await card.getAttribute('data-badge') ?? '')
            const button = await card.getByRole('button', { name: 'shopping-cart Mua ngay' }).getByText('Mua ngay').textContent() ?? '';
            const buttonHeart = await card.getByText(' Yêu thích', { exact: true }).textContent() ?? '';


            // console.log(await A1)
            productDatas.push({ name, price, sku, category, badge, button, buttonHeart }); // Gom thành object JavaScript để compare bằng expect().

        }
        console.log(productDatas)

        //test case for Product card
        expect(productDatas).toHaveLength(3);
        expect(productDatas.map(item => item.category)).toContain('Audio')
        expect(productDatas.map(item => item.sku)).toContain('IP15P-256')
        expect(productDatas.some(item => item.category === 'Audio')).toBeTruthy()
        expect(productDatas.map(item => item.name)).toEqual(['iPhone 15 Pro', 'AirPods Pro', 'Apple Watch Series 9'])
        expect(productDatas[0]?.price).toBeGreaterThan(900)
        expect(productDatas[1]?.price).toBeLessThan(300)
        expect(productDatas.some(item => item.sku === 'AWS9-45' && item.badge === 'Best Seller')).toBe(true);
        expect(productDatas.map(item => item.button.trim())).toContain('Mua ngay')


        //Test button có tồn tại hay không
        for (let i = 0; i <= A; i++) {
            const card = productCard.nth(i)
            await expect(card.getByRole('button', { name: 'shopping-cart Mua ngay' }).getByText('Mua ngay')).toBeTruthy()
            await card.getByRole('button', { name: 'shopping-cart Mua ngay' }).isVisible()
        }

        //Test tổng tiền
        const totalCardText = ((await dashboad1.locator('#cart-total').textContent()) ?? '$0').trim();
        const cardTotal = Number(totalCardText.replace('$', '').replace(',', ''));
        const orderStatus = ((await dashboad1.locator('#order-status').textContent()) ?? '').trim();
        const profileText = (await dashboad1.getByTestId('ecommerce-profile-json').textContent()) ?? '{}';
        const profile = JSON.parse(profileText);
        const category = await dashboad1.getByTestId('ecommerce-category-tag').allTextContents();
        const flags = {
            inStock: ((await dashboad1.locator('#in-stock-flag').getAttribute('data-value')) ?? '') === 'true',
            outStock: Boolean((await dashboad1.locator('#sold-out-flag').getAttribute('data-value')) ?? ''),
        };
        const totalCard = await productCard.count()
        const summary = { productCount: totalCard, cardTotal, orderStatus }

        console.log(category)
        console.log(summary)

        expect(summary.productCount).toBe(3);
        expect(cardTotal).toBe(1647);
        expect(summary).toEqual({ productCount: 3, cardTotal: 1647, orderStatus: 'Processing' });
        expect(flags.inStock).toBeTruthy();
        expect(flags.outStock).toBeFalsy();
        expect(productDatas[0]?.price).toBeGreaterThan(900);
        expect(productDatas[1]?.price).toBeLessThan(300);
        expect(productDatas).toContainEqual({ name: 'AirPods Pro', price: 249, sku: 'APPRO-2', category: 'Audio', badge: 'Top Audio', button: ' Mua ngay', buttonHeart: ' Yêu thích' })
        expect(profile).toEqual(expect.objectContaining({ active: true, premium: false }))
        expect(category).toEqual(expect.arrayContaining(['Phone', 'Audio', 'Watch']));
        expect(productDatas).toEqual(expect.arrayContaining([expect.objectContaining({ sku: 'AWS9-45', badge: 'Best Seller' })]));
        console.log(expect.objectContaining({ sku: 'AWS9-45', badge: 'Best Seller' }), 111)




    })

})
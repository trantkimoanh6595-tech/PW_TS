import { test, expect } from '@playwright/test';

test.describe('bai8', () => {
    test('Tcs 01', async ({ page }) => {
        const urlpage = 'https://lab.autoneko.com/'
        await page.goto(urlpage)
        await page.getByRole('link', { name: 'Bài 3: Text Methods & Assertions', exact: true }).click()
        await page.getByRole('tab', { name: '✅ Expect Assertion' }).click()
        const panel = page.getByRole('tabpanel', { name: '✅ Expect Assertions' })
        const dashboad = panel.getByTestId('lesson3-movie-dashboard')
        const productCard = dashboad.getByTestId('movie-card')
        const cardTotal = await productCard.count()
        const productData: Array<{
            title: string,
            year: number,
            rating: string,
            genres: string,
            like: boolean,
            inlist: boolean,
            beforeLike: boolean,
            affterLike: boolean
            addBefore:boolean,
            addAffter:boolean
        }> = [];
        // console.log(cardTotal,123)
        // console.log(await productCard.allTextContents())


        for (let index = 0; index < cardTotal; index++) {
            const card = productCard.nth(index)
            const title = await card.getAttribute('data-title') ?? '';
            const year = Number(await card.getAttribute('data-year') ?? 0);
            const rating = await card.getAttribute('data-rating') ?? '';
            const genres = await card.getAttribute('data-genres') ?? '';
            const like = (await card.getAttribute('data-liked')) === 'true';
            const inlist = await card.getAttribute('data-inlist') === 'true';
            const button = await card.getByRole('button', { name: 'star Yêu thích' })
            const beforeLike = await card.getAttribute('data-liked') === 'true';
            await button.click()
            const affterLike = await card.getAttribute('data-liked') === 'true';
            expect(affterLike).not.toBe(beforeLike)
            const addButton = await page.getByRole('button', { name: 'star Yêu thích' })
            const addBefore = await card.getAttribute('data-inlist') === 'true';
            await button.click()
            const addAffter = await card.getAttribute('data-inlist') === 'true';


            productData.push({ title, year, rating, genres, like, inlist, beforeLike, affterLike,addBefore,addAffter });
            // console.log(index)


        }
        for (let index = 0; index < cardTotal; index++) {
            const card = productCard.nth(index)
            const button = await card.getByRole('button', { name: 'star Yêu thích' })



            // const buttonInlist= await card.getByRole('button',{name:'shopping-cart Thêm vào List'}).click()
            // const inlist = await card.getAttribute('data-inlist')==='true';
            // console.log(inlist,111)








            //    await expect(startAfterClick).toHaveCSS('color','rgb(245, 158, 11)')
            // expect(card.getByRole('button',{name:'star Yêu thích'})).toBeVisible();



        }

        console.log(productData)
        //    await page.pause()








    })

})
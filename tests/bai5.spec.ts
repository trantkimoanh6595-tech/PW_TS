import { test, expect } from '@playwright/test';

// const DEMO_URL= 'https://demoapp-sable-gamma.vercel.app/'

// test('Bai 5',async({page}) =>{
//     await page.goto(DEMO_URL);
//     await page.getByRole('link',{name:'Bài 3: Tổng hợp Text Methods'}).click()
    
//     const parrent= page.locator("#demo-element-2")
     
//     const text1= await parrent.textContent();
//     console.log('text1',text1)

//     const text2= await parrent.innerText()
//     console.log('text2', text2)

//     const text3= await parrent.innerHTML()
//     console.log('text3',text3)

//     const textContentA= page.locator("#demo-dropdown")

//     const allText= await textContentA.allInnerTexts()
//     console.log('allText',allText)

//     const textContenB= page.locator(".demo-list-item")

//     const allB= await textContenB.allTextContents();
//     console.log('allB', allB)

//     const allC= await textContenB.allInnerTexts()
//     console.log('allC', allC)

//     const html= await textContentA.innerHTML()
//     console.log(html)

//     const html2= await parrent.innerHTML()
//     console.log(html2)

//     const navLink = page.locator('nav a')
//     const allLinkTexts= await navLink.allTextContents();
//     console.log(allLinkTexts)

//     const attributes= page.locator('#demo-attributes')
//     const dataAttributes= await attributes.getAttribute('data-status')
//     console.log(dataAttributes)

//     // 
//     //tobe.value
//     const myName='Playwright';
//     expect(myName).toBe('Playwright');

//     const user1={id:1, name:'Oanh'};
//     const user2={id:1, name: 'Oanh'}
//     const fruits=['Táo', 'Cam', 'Xoài']
//     expect(fruits).toContain('Cam')
//     console.log(fruits[1])

//     // console.log(parrent.count());

// })

const URL_DEMO2= 'https://lab.autoneko.com/'
test('Bai 5',async({page}) => {
    await page.goto(URL_DEMO2)
    await page.getByRole('link',{name:'Bài 3: Text Methods & Assertions', exact: true}).click()
    // await page.pause()
    
    const summary= page.locator('#demo-whitespace-text')
    await expect(summary).toBeVisible();

    const text1= await summary.textContent()
    console.log(text1)

   await expect(summary).toHaveText('Xin chào Học viên Playwright')

   const label1= page.getByTestId('demo-whitespace-raw');
   await expect(label1).toHaveText('Raw DOM: Xin chào···Học viên↵Playwright') 

   const textRaw = await summary.textContent()
   expect(textRaw).toBe('Xin chào   Học viên\nPlaywright')

   const demoElementIndex= 1;
   const element=  page.locator(`#demo-element-${demoElementIndex}`);
   await expect(element).toBeVisible();
   const hidenText = await element.getByText('Text ẩn (display:none)')
//    console.log(hidenText)
   await expect(hidenText).toBeAttached()
   await expect(hidenText).not.toBeVisible();
//    console.log (await hidenText.textContent(),1) //dùng innerHTML cũng đc
//    console.log(await hidenText.innerText(),2)
//    console.log(await hidenText.innerHTML(),3)
const text4= await element.textContent()
console.log(text4)
const text5= await element.innerText()
console.log(text5)
const text6= await element.innerHTML()
console.log(text6)

expect(text4).toBe('Text hiển thịText ẩn (display:none)Text conText inline')
expect(text5).toBe('Text hiển thị\nText con\nText inline')
expect(text6).toBe('Text hiển thị<span style="display: none;">Text ẩn (display:none)</span><div>Text con</div><span>Text inline</span>')
// expect(text4).toBe('Text hiển thịText ẩn (display:none)Text conText inline')

// //bài 2
// const demoElementIndex2= 2
// const element2= await page.locator(`#demo-element-2-${demoElementIndex2}`)
// await expect(element2).toBeVisible;

const S1= await page.locator('#demo-useinnertext')
await expect(S1).toContainText('Xin chào học viên', {useInnerText: true})
// console.log(S1)

const dropDown=  page.locator('#demo-dropdown')
const dropDownOption= page.locator('#demo-dropdown option')
await expect(dropDownOption).toHaveCount(4)
const A=await dropDownOption.allTextContents()
console.log(A)

const listItem= page.locator('.demo-list-item')
await expect(listItem).toHaveCount(3)
const B= await listItem.allTextContents()
console.log(B)

const linkA= page.locator('#demo-nav a')
await expect(linkA).toHaveCount(3)

// const phone= 'demo-product-name'
// const producPhone= page.locator(`.${phone}`)
const phone1= await page.locator('.demo-product-name').allTextContents()
// await expect(producPhone).toHaveCount(3)
console.log(phone1)
// console.log(producPhone).allTextContents()

const inputName= 'text'
const inputEmail= 'email'
const nameInput= page.locator(`#demo-input-${inputName}`)
const emailInput= page.locator(`#demo-input-${inputEmail}`)
// await expect(nameInput).toHaveValue('John Doe')
// await expect(emailInput).toHaveValue('john@example.com')
const inputName1= await nameInput.inputValue();
const emailInput1= await emailInput.inputValue();
const valueAtr= await nameInput.getAttribute("value");
const idAttr= await emailInput.getAttribute('id')
// console.log(inputName1)
// console.log(emailInput1)
// await nameInput.fill('')

// const newName='Tuệ Nhi'
// await nameInput.fill(newName)
// const actualName= await nameInput.inputValue()
// await expect(actualName).toBe(newName)
// // await page.pause()






})
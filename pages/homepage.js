const chai = require('chai');
const { productTab } = require('../object_locator/homepage.js');
const assert = chai.assert;
const expect = chai.expect
const obj_locator = require('../object_locator/homepage.js');
const productpage = require('../object_locator/productpage.js');

async function getHomepageUsername(page){
   // await page.click(obj_locator.moreSel);
    await page.waitForSelector(obj_locator.custNameSel);
    let element = await page.$(obj_locator.custNameSel)
    let name = await page.evaluate(el => el.innerText, element);

    //name = name.substring(7);
    console.log(name);
    return name;
}
async function verifyHomepageUsername(name,username){
   assert.equal(name,username,"Equal")
}
async function clickOnAccountAndListDropDown(page){
    await page.waitForSelector(obj_locator.dropdownSel)
    await page.tap(obj_locator.dropdownSel);
}
async function clickOnSignOut(page){
    await page.waitForSelector(obj_locator.signOutSel)
    await page.click(obj_locator.signOutSel)
}
async function clickOnCart(page){
    var el=await page.waitForSelector(obj_locator.cartSel)
    await el.click()
}
async function newProductTab(page){
    const [newPage] = await Promise.all([
        new Promise((resolve) => page.once('popup', resolve)),
        page.click(obj_locator.productClick),
      ]);
      return newPage
}

module.exports ={
    getHomepageUsername,
    verifyHomepageUsername,
    clickOnAccountAndListDropDown,
    clickOnSignOut,
    clickOnCart,
    newProductTab
} 
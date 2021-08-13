const obj_locator = require('../object_locator/landingpage.js');
async function searchForProduct(page,text){
    await page.type(obj_locator.searchboxSel,text,{delay : 200});
    await page.keyboard.press('Enter');
} 
async function clickOnSignIn(page){
    await page.waitForSelector(obj_locator.clickLoginSel);
    await page.click(obj_locator.clickLoginSel);
}
module.exports ={
    searchForProduct,
    clickOnSignIn
}
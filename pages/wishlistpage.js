const obj_locator = require('../object_locator/wishlistpage.js');
const chai = require('chai');
const assert = chai.assert; 
async function getProductTilteFromWishListPage(page){
    await page.waitForSelector(obj_locator.productTitle)
    let element = await page.$(obj_locator.productTitle)
    let productTitle = await page.evaluate(e1 => e1.textContent,element)
    return productTitle.trim();
}
async function verifyProductTitleIsSameAsWishListPage(first,second){
    assert.equal(first,second,"Equal Title");
}
async function getAddedDateOfProductFromWishListPage(page){
    await  page.waitForSelector(obj_locator.addedDateOfProduct)
    let element = await page.$(obj_locator.addedDateOfProduct)
    let date = await page.evaluate(e1 => e1.textContent,element)
    return date.trim();

}
module.exports = {
getProductTilteFromWishListPage,
verifyProductTitleIsSameAsWishListPage,
getAddedDateOfProductFromWishListPage
}
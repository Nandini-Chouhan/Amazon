const obj_locator = require('../object_locator/productpage.js');
const chai = require('chai');
const { addToWishListButton } = require('../object_locator/productpage.js');
const { FrameManager } = require('puppeteer');
const assert = chai.assert; 
async function getProductTitleFromProductPage(page){
    await page.waitForSelector(obj_locator.pageTitleSel)
    let element = await page.$(obj_locator.pageTitleSel)
    let productTitle = await page.evaluate(e1 => e1.textContent,element)
    return productTitle.trim();
}

async function getProductRatingFromProductPage(page){
    await page.waitForSelector(obj_locator.pageRatingSel)
    let element = await page.$(obj_locator.pageRatingSel)
    let productRating = await page.evaluate(e1 => e1.textContent,element)
    productRating = productRating.replace(/[^0-9]/g,'');
    return productRating;
}

async function getProductPriceFromProductPage(page){
    await page.waitForSelector(obj_locator.pagePriceSel)
    let element = await page.$(obj_locator.pagePriceSel)
    let productPrice = await page.evaluate(e1 => e1.textContent,element)
    productPrice = parseFloat(productPrice.substring(1))
    return productPrice;
}
async function verifyProductTitleIsSameAsResultPage(first,second){
    assert.equal(first,second,"Equal Title");
}
async function verifyProductRatingIsSameAsResultPage(first,second){
    assert.equal(first,second,"Equal Rating")
}
async function verifyProductPriceIsSameAsResultPage(first,second){
    assert.equal(first,second,"Equal Price")
}

async function addProductToCart(page){
    await page.waitForSelector(obj_locator.addToCartSel);
    await page.click(obj_locator.addToCartSel);
}
async function getNumberOfProductFromCart(page){
    await page.waitForSelector(obj_locator.cartSel);
    let element= await page.$(obj_locator.cartSel)
    let item = await page.evaluate(e1 => e1.textContent,element) 
    return parseInt(item);
}
async function checkIfProductIsAddedToCart(before,after){
    assert.equal(before+1,after,"Equal")
}
async function addProductToWishList(page){
    await page.waitForSelector(addToWishListButton)
    await page.click(addToWishListButton)
}
async function clickOnBuyNowButton(page){
    await page.waitForSelector(obj_locator.buyNowButton)
    await page.click(obj_locator.buyNowButton)
}
async function isSelectorIsVisibleOnDelivery(page){
    await page.waitForSelector(obj_locator.deliveryToThisAddressButton, {
        visible: true,
})
}
async function clickOnDeliverToThisAddressButton(page){
    await page.waitForSelector(obj_locator.deliverToThisAddressButton)
    await page.click(obj_locator.deliverToThisAddressButton)
}
async function isSelectorIsVisibleOnPayment(page){
    await page.waitForSelector(obj_locator.addCardRadioButton, {
        visible: true,
})}
async function clickOnAddDebitCreditCardRadioButton(page){
    await page.waitForSelector(obj_locator.addCardRadioButton)
    await page.click(obj_locator.addCardRadioButton)
}
async function clickOnAddACreditOrDebitCard(page){
    await page.waitForSelector(obj_locator.addCreditOrDebitCardLink)
    await page.click(obj_locator.addCreditOrDebitCardLink)
}
async function clickOnViewWishListButton(page){
    await page.waitForSelector(obj_locator.viewWishListButton)
    await page.click(obj_locator.viewWishListButton)
}
async function acceptDialogBox(page){
    page.on("dialog", (dialog) => {
        console.log("dialog");
        dialog.accept();
      });
}
async function typeCardNumberOnPayementPopUp(page,cardno){
    const frame = page.frames().find((frame) => frame.name() === 'ApxSecureIframe');
    await frame.waitForSelector(obj_locator.cardNumberPopUp)
    await frame.type(obj_locator.cardNumberPopUp,cardno,{delay : 100});
}
async function typeNameOnCardOnPayementPopUp(page,name){
    const frame = page.frames().find((frame) => frame.name() === 'ApxSecureIframe');
    await frame.waitForSelector(obj_locator.nameOnCardPopUp)
    await frame.type(obj_locator.nameOnCardPopUp,name,{delay : 100});
}
async function selectExpiryDateOfCardPayementPopUp(page){
    const frame = page.frames().find((frame) => frame.name() === 'ApxSecureIframe');
    await frame.waitForSelector(obj_locator.expiryMonthDropDownButton)
    await frame.click(obj_locator.expiryMonthDropDownButton);
    await frame.waitForSelector(obj_locator.expiryMonth)
    await frame.click(obj_locator.expiryMonth);
    await frame.waitForSelector(obj_locator.expiryYearDropDownButton)
    await frame.click(obj_locator.expiryYearDropDownButton)
    await frame.waitForSelector(obj_locator.expiryYear)
    await frame.click(obj_locator.expiryYear)
}
async function clickOnAddYourCardPayementPopUp(page){
    const frame = page.frames().find((frame) => frame.name() === 'ApxSecureIframe');
    await frame.waitForSelector(obj_locator.addYouCardButton)
    await frame.click(obj_locator.addYouCardButton)
}
async function clickOnSavedCardRadioButton(page){
    await page.waitForSelector(obj_locator.savedCardRadioButton)
    await page.click(obj_locator.savedCardRadioButton)
}
async function typeCVVOfCard(page,cvv){
    await page.waitForSelector(obj_locator.CVVCardText)
    await page.type(obj_locator.CVVCardText,cvv,{delay:100})
}
module.exports = {
    getProductTitleFromProductPage,
    getProductRatingFromProductPage,
    getProductPriceFromProductPage,
    verifyProductTitleIsSameAsResultPage,
    verifyProductRatingIsSameAsResultPage,
    verifyProductPriceIsSameAsResultPage,
    addProductToCart,
    getNumberOfProductFromCart,
    checkIfProductIsAddedToCart,
    addProductToWishList,
    clickOnBuyNowButton,
    isSelectorIsVisibleOnDelivery,
    clickOnDeliverToThisAddressButton,
    isSelectorIsVisibleOnPayment,
    clickOnAddDebitCreditCardRadioButton,
    clickOnAddACreditOrDebitCard,
    clickOnViewWishListButton,
    acceptDialogBox,
    typeCardNumberOnPayementPopUp,
    typeNameOnCardOnPayementPopUp,
    selectExpiryDateOfCardPayementPopUp,
    clickOnAddYourCardPayementPopUp,
    clickOnSavedCardRadioButton,
    typeCVVOfCard
}
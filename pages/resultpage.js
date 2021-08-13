const { equal } = require('assert');
const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert; 
const obj_locator = require('../object_locator/resultpage.js');

async function getNumberOfResultsFromResultPage(page){
    await page.waitForSelector(obj_locator.resultSel);
    let element =  await page.$(obj_locator.resultSel);
    let res = await page.evaluate(e1 => e1.textContent,element)
    res = res.substring(13).replace(/[^0-9]/g,'');
    return res;
    
}

async function getProductTitleFromResultPage(page){
    await page.waitForSelector(obj_locator.titleSel);
    let element = await page.$(obj_locator.titleSel);
    let title = await page.evaluate(e1 => e1.textContent,element);
    return title;
}

async function getProductRatingFromResultPage(page){
    await page.waitForSelector(obj_locator.ratingSel)
    let element = await page.$(obj_locator.ratingSel)
    let rating = await page.evaluate(e1 => e1.textContent,element)
    rating = rating.replace(/[^0-9]/g,'');
    return rating;
}

async function getProductPriceFromResultPage(page){
    await page.waitForSelector(obj_locator.priceSel)
    let element = await page.$(obj_locator.priceSel);
    let price = await page.evaluate(e1 => e1.textContent,element)
    price = price.replace(/[^0-9]/g,'')
    return price;
}

async function clickOnProduct(page){
    await page.click(obj_locator.productSel);
}
async function applyBrandFilterOnResultPage(page){
     await page.waitForSelector(obj_locator.checkboxSel);
    await page.click(obj_locator.checkboxSel);
    //page.waitFor(5000);
}
async function verifyResultAfterFilter(first,second){
    expect(first).to.not.equal(second);
}
async function getNumberOfResultsFromResultPageAfterFilter(page){
    await page.waitForSelector(obj_locator.resultAfterSel);
    let element =  await page.$(obj_locator.resultAfterSel);
    let res = await page.evaluate(e1 => e1.textContent,element)
    res = res.substring(7).replace(/[^0-9]/g,'');
    parseInt(res);
    return res;
}
async function setMinPriceOfProductOnResultPage(page,min){
    await page.waitForSelector(obj_locator.minSel)
    await page.type(obj_locator.minSel,min);
}
async function setMaxPriceOfProductOnResultPage(page,max){
    await page.type(obj_locator.maxSel,max);
}
async function clickOnGoButton(page){
    await page.click(obj_locator.goSel);
}
module.exports = {
    getNumberOfResultsFromResultPage,
    getProductTitleFromResultPage,
    getProductRatingFromResultPage,
    getProductPriceFromResultPage,
    clickOnProduct,
    applyBrandFilterOnResultPage,
    verifyResultAfterFilter,
    getNumberOfResultsFromResultPageAfterFilter,
    setMinPriceOfProductOnResultPage,
    setMaxPriceOfProductOnResultPage,
    clickOnGoButton
}
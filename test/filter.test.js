const common_action = require('../common_action/commonAction.js');
const landingpage = require('../pages/landingpage.js')
const resultpage = require('../pages/resultpage');
const productpage = require('../pages/productpage');
const testdata = require('../common_action/testdata.json')
describe('Filter is applyed',()=>{
    it('result testing',async()=>{
        const page = await common_action.openBrowser(testdata.url);
        await page.waitForTimeout(2000);
        await landingpage.searchForProduct(page,testdata.searchText);
        await page.waitForTimeout(2000);
        const noOfResults = await resultpage.getNumberOfResultsFromResultPage(page);
        await page.waitForTimeout(5000);
        await resultpage.applyBrandFilterOnResultPage(page);
        await page.waitForTimeout(6000);
        const noOfResultsAfterFilter = await resultpage.getNumberOfResultsFromResultPageAfterFilter(page);
        await resultpage.verifyResultAfterFilter(noOfResults,noOfResultsAfterFilter)
        await resultpage.setMinPriceOfProductOnResultPage(page,'10')
        await resultpage.setMaxPriceOfProductOnResultPage(page,'20');
        await resultpage.clickOnGoButton(page);
        await page.waitForNavigation(5000);
       
        await common_action.closeBrowser();
    })
    
})
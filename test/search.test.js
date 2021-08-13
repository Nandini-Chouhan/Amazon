const common_action = require('../common_action/commonAction.js');
const landingpage = require('../pages/landingpage.js')
const resultpage = require('../pages/resultpage');
const productpage = require('../pages/productpage');
const testdata = require('../common_action/testdata.json')
const homepage = require('../pages/homepage.js')
describe('value is send to searchbar',()=>{
    it('search bar testing',async()=>{
        const page = await common_action.openBrowser(testdata.url);
        await page.waitForTimeout(2000);
        await landingpage.searchForProduct(page,testdata.searchText);
        await page.waitForTimeout(2000);
        const noOfResults = await resultpage.getNumberOfResultsFromResultPage(page);
        console.log('Number of Results : '+noOfResults); 
        const resulttitle = await resultpage.getProductTitleFromResultPage(page);
        const resultrating = await resultpage.getProductRatingFromResultPage(page);
        const resultprice = await resultpage.getProductPriceFromResultPage(page);
        const newPage = await homepage.newProductTab(page);
        const producttitle = await productpage.getProductTitleFromProductPage(newPage);
        const productrating = await productpage.getProductRatingFromProductPage(newPage);
        const productprice = await productpage.getProductPriceFromProductPage(newPage);
        await productpage.verifyProductTitleIsSameAsResultPage(resulttitle,producttitle);
        await productpage.verifyProductRatingIsSameAsResultPage(resultrating,productrating);
        //await productpage.verifyProductPriceIsSameAsResultPage(resultprice,productprice);
        
        await newPage.close(true);
        await common_action.closeBrowser();
    })
})
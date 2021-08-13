const common_action = require('../common_action/commonAction.js');
const credential = require('../common_action/credential.json');
const landingpage = require('../pages/landingpage.js')
const loginpage = require('../pages/loginpage.js')
const homepage = require('../pages/homepage.js')
const resultpage = require('../pages/resultpage.js')
const productpage = require('../pages/productpage.js')
const wishlistpage = require('../pages/wishlistpage.js')
const testdata = require('../common_action/testdata.json')


describe("Add to wishlist",() => {
    it("Testing", async ()=>{
    //Sign In On Amazon
    const page = await common_action.openBrowser(testdata.url);
    await landingpage.clickOnSignIn(page);
    await page.waitForTimeout(5000);
    await loginpage.typeUsername(page,credential.email)
    await loginpage.clickOnContinue(page);
    await page.waitForNavigation(0);
    await loginpage.typePassword(page,credential.password)
    await loginpage.clickOnSignIn(page);
    await page.waitForTimeout(5000);
    await landingpage.searchForProduct(page,testdata.searchText);
    await page.waitForNavigation(0);
    
    const newPage = await homepage.newProductTab(page);
    await newPage.waitForNavigation(0);
    const productTitle = await productpage.getProductTitleFromProductPage(newPage);
   
    await productpage.addProductToWishList(newPage);
    await newPage.waitForTimeout(5000);
    await productpage.clickOnViewWishListButton(newPage);
    await newPage.waitForTimeout(5000);
    const addedDate = await wishlistpage.getAddedDateOfProductFromWishListPage(newPage);
    console.log(addedDate);
    const productTitleOfWishList = await wishlistpage.getProductTilteFromWishListPage(newPage);
    await wishlistpage.verifyProductTitleIsSameAsWishListPage(productTitle,productTitleOfWishList)   
    
    await newPage.close(true)
    await homepage.clickOnAccountAndListDropDown(page);
    await homepage.clickOnSignOut(page);
    await page.waitForTimeout(5000);
    await loginpage.isSelectorIsVisible(page);   
    await common_action.closeBrowser();
  })
})
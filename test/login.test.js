const common_action = require('../common_action/commonAction.js');
const credential = require('../common_action/credential.json');
const card_details = require('../common_action/card_details.json');
const landingpage = require('../pages/landingpage.js')
const loginpage = require('../pages/loginpage.js')
const homepage = require('../pages/homepage.js')
const resultpage = require('../pages/resultpage.js')
const productpage = require('../pages/productpage.js')
const testdata = require('../common_action/testdata.json')



describe("User Login", ()=>{
     it("Login with valid credential",async ()=> {
        const page = await common_action.openBrowser(testdata.url);
        await landingpage.clickOnSignIn(page);
        await page.waitForTimeout(5000);
        await loginpage.typeUsername(page,credential.email)
        await loginpage.clickOnContinue(page);
        await page.waitForNavigation(0);
        await loginpage.typePassword(page,credential.password)
        await loginpage.clickOnSignIn(page);
        const name = await homepage.getHomepageUsername(page);

        await homepage.verifyHomepageUsername(testdata.username,name)

        await page.waitForNavigation(0);
        await landingpage.searchForProduct(page,testdata.searchText);
        await page.waitForNavigation(0);
        const newPage = await homepage.newProductTab(page);
        let cartValBefore = await productpage.getNumberOfProductFromCart(newPage)
        await productpage.addProductToCart(newPage);
        await newPage.waitForNavigation(0);
        let cartValAfter = await productpage.getNumberOfProductFromCart(newPage)
        await productpage.checkIfProductIsAddedToCart(cartValBefore,cartValAfter);
       
        await homepage.clickOnAccountAndListDropDown(newPage);
        await homepage.clickOnSignOut(newPage);
        await newPage.waitForTimeout(5000);
        await loginpage.isSelectorIsVisible(newPage);
        
        await newPage.close(true);
        await common_action.closeBrowser();

    })
})
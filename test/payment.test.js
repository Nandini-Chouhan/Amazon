const common_action = require('../common_action/commonAction.js');
const credential = require('../common_action/credential.json');
const card_details = require('../common_action/card_details.json');
const landingpage = require('../pages/landingpage.js')
const loginpage = require('../pages/loginpage.js')
const homepage = require('../pages/homepage.js')
const resultpage = require('../pages/resultpage.js')
const productpage = require('../pages/productpage.js')
const testdata = require('../common_action/testdata.json')
const { productTitle } = require('../object_locator/wishlistpage.js');

describe("Payment",() => {
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
    await newPage.waitForTimeout(5000)
    await productpage.clickOnBuyNowButton(newPage)
    await newPage.waitForTimeout(5000);
    //await productpage.isSelectorIsVisibleOnDelivery(newPage)
    //await newPage.waitForNavigation(0);
    await productpage.clickOnDeliverToThisAddressButton(newPage);
    await newPage.waitForTimeout(5000);
   
    
  /* 
   //Add New Card
    // await productpage.isSelectorIsVisibleOnPayment(newPage)
    await productpage.clickOnAddDebitCreditCardRadioButton(newPage)
    await newPage.waitForTimeout(5000)
    
    await productpage.clickOnAddACreditOrDebitCard(newPage);
    await newPage.waitForTimeout(5000);
    
    await productpage.typeCardNumberOnPayementPopUp(newPage,card_details.cardNumber);
    await productpage.typeNameOnCardOnPayementPopUp(newPage,testdata.username);
    await productpage.selectExpiryDateOfCardPayementPopUp(newPage);
    await productpage.clickOnAddYourCardPayementPopUp(newPage);
    await newPage.waitForTimeout(5000);
    */
    //Use Saved Card
    await productpage.clickOnSavedCardRadioButton(newPage);
    await productpage.typeCVVOfCard(newPage,card_details.cvv);
    await newPage.waitForTimeout(5000);
    await newPage.close(true);
    await common_action.closeBrowser();
  })
})
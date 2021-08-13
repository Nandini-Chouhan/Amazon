const obj_locator = require('../object_locator/loginpage.js');
async function typeUsername(page,username){
    await page.type(obj_locator.usernameSel,username,{delay : 200});
}
async function typePassword(page,password){
    await page.type(obj_locator.passwordSel,password,{delay : 200});
}
async function clickOnContinue(page){
    await page.click(obj_locator.continueSel)
}
async function clickOnSignIn(page){
    await page.click(obj_locator.signInSel)
}
async function isSelectorIsVisible(page){
    await page.waitForSelector(obj_locator.usernameSel, {
        visible: true,
      })
}
module.exports ={
    typeUsername,
    typePassword,
    clickOnContinue,
    clickOnSignIn,
    isSelectorIsVisible
}
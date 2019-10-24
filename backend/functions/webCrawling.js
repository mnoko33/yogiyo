// const models = require('../models');
// const webdriver = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const By = webdriver.By;
//
//
// module.exports = async function(urlId) {
//     let driver = new webdriver.Builder()
//         .forBrowser('chrome')
//         .build();
//
//     const url = `https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/${urlId}/`;
//     await driver.get(url);
//     let testXpath = "//*[@id=\"menu\"]/div/div[1]/div[2]/div/ul";
//     let test = await driver.findElement(By.xpath(testXpath))
//     console.log(test);
//     //*[@id="menu"]/div/div[1]/div[2]/div/ul
//     //*[@id="menu"]/div/div[1]/div[2]/div/ul/li[1]
// }
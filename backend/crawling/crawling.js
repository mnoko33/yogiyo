// const webdriver = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// let driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();
//
// const categoryList = [
//     "https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C/135011/%EC%B9%98%ED%82%A8/",
//     "https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C/135011/%ED%94%BC%EC%9E%90%EC%96%91%EC%8B%9D/",
//     "https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C/135011/%EC%A4%91%EC%8B%9D/",
//     "https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C/135011/%ED%95%9C%EC%8B%9D/",
//     "https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C/135011/%EC%9D%BC%EC%8B%9D%EB%8F%88%EA%B9%8C%EC%8A%A4/",
// ];
//
// // async function crawling (driver) {
// //     const url = "https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/";
// //     const By = webdriver.By;
// //     driver.get(url);
// //     const elList = await driver.findElements(By.className('category-title'));
// //     console.log(elList[0]);
// //     driver.click(elList[0]);
// // }
// //
// // crawling(driver);
//
//
// const url = "https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/";
// const By = webdriver.By;
// driver.get(url);
// driver.findElements(By.className('category-title'))
//     .then((elList) => {
//         driver.click(elList[0])
//     })
//     .catch((err) => {
//         console.log(err);
//     });

const axios = require('axios');
const models = require('../models');

async function getRestrauntList() {
    try {
        const res =  await axios.get('https://www.yogiyo.co.kr/api/v1/restaurants-geo/', {
            params: {
                "items": 1000,
                "lat": 37.4951124,
                "lng": 127.0404704,
                "order": "rank",
                "page": 0,
            },
            headers: {
                "X-ApiKey": "iphoneap",
                "X-ApiSecret": "fe5183cc3dea12bd0ce299cf110a75a2",
                "X-MOD-SBB-CTYPE": "xhr"
            }
        });
        const restaurantList = res.data["restaurants"];
        restaurantList.forEach((Restaurant) => {
            models.Restaurant.findOrCreate({
                    where: { name: Restaurant.name },
                    defaults: {
                        "name": Restaurant.name,
                        "category": Restaurant.categories.join('::'),
                        "thumbnailUrl": Restaurant.thumbnail_url,
                        "address": Restaurant.address.split(' ')[2],
                        "lng": Restaurant.lng,
                        "lat": Restaurant.lat,
                        "openTime": Restaurant.open_time_description,
                        "deliveryTime": Restaurant.estimated_delivery_time_key,
                        "representativeMenus": Restaurant.representative_menus,
                        "deliveryFee": Restaurant.delivery_fee,
                        "minOrderAmount": Restaurant.min_order_amount,
                        "paymentMethods": Restaurant.payment_methods.join('::')
                    }
                })
        })
    } catch (err) {
        console.log(err)
    }
}

async function createMenu(models) {
    const restaurant = await models.Restaurant.findOne({
        where: { id: 1 }
    });
    models.Menu.create({
        name: "마라탕",
        price: 7000,
        restaurantId: restaurant.id
    })
        .then((menu) => {
            console.log(menu);
        })
        .catch((err) => {
            console.log(err);
        })
}

async function getMenu(models) {
    const restaurant = await models.Restaurant.findOne({
        where: { id:1 }
    });
    console.log(restaurant.id)
    const menus = await restaurant.getMenus();
    menus.forEach((menu) => {
        console.log(menu.name);
    })
}
// getRestrauntList();
// createMenu(models);
// getMenu(models);


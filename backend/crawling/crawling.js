const axios = require('axios');
const models = require('../models');
const sleep = require('system-sleep');


const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const By = webdriver.By;

const loc = [
    {   // 역삼
        "lat": 37.4951124,
        "lng": 127.0404704
    },
    {   // 혜화
        "lat": 37.582302,
        "lng": 127.001867
    }
];

const restList = async function() {
    try {
        const res =  await axios.get('https://www.yogiyo.co.kr/api/v1/restaurants-geo/', {
            params: {
                "items": 1000,
                "lat": loc[0].lat,
                "lng": loc[0].lng,
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
        const limit = restaurantList.length > 200 ? 200 : restaurantList.length;
        let container = [];
        for (let i = 0; i <= limit; i++) {
            sleep(10000);
            (async function(j) {
                const restaurant = restaurantList[j];
                const urlId = restaurant.id;
                // console.log('urlId: ', restaurant.id)
                const result = await models.Restaurant.findOrCreate({
                    where: { name: restaurant.name },
                    defaults: {
                        "name": restaurant.name,
                        "category": restaurant.categories.join('::'),
                        "thumbnailUrl": restaurant.thumbnail_url,
                        "address": restaurant.address.split(' ')[2],
                        "lng": restaurant.lng,
                        "lat": restaurant.lat,
                        "openTime": restaurant.open_time_description,
                        "deliveryTime": restaurant.estimated_delivery_time_key,
                        "representativeMenus": restaurant.representative_menus,
                        "deliveryFee": restaurant.delivery_fee,
                        "minOrderAmount": restaurant.min_order_amount,
                        "paymentMethods": restaurant.payment_methods.join('::')
                    }
                }); // return (instance, isCreated)
                // create only menus
                if (container.includes(result[0].id)) {
                    return true
                }
                container.push(result[0].id);
                // if (!result[1]) {
                //     console.log('already created!')
                //     return true
                // }
                const rest = result[0];
                let id = rest.id;
                let name = rest.name;
                // console.log('--------------------------------------');
                // console.log(`restaurant : ${name}, // ${restaurant.name}`);
                console.log(await crawlingMenus(urlId, id, name))
            })(i)

        }
    }
    catch(e) {
        console.log(e);
    }
};

restList()
    .then(() => {
        console.log('###################success')
    })
    .catch(() => {
        console.log('###################failed')
    });

// 메뉴 크롤링 and 만들기
async function crawlingMenus (urlId, id, name) {
    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
    // console.log('func crawlingMenus is started');
    const url = `https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/${urlId}/`;
    await driver.get(url);

    let i = 2;
    while (true) {
        try {
            const labelXpath = `//*[@id="menu"]/div/div[${i}]/div[1]/h4/a/span`;
            // 라벨
            const label = await driver.findElement(By.xpath(labelXpath));
            const labelName = await label.getAttribute('innerText');
            // 메뉴 크롤링
            let j = 1;
            while (true) {
                try {
                    const menuXpath = `//*[@id="menu"]/div/div[${i}]/div[2]/div/ul/li[${j}]/table/tbody/tr/td[1]/div[2]`;
                    const priceXpath = `//*[@id="menu"]/div/div[${i}]/div[2]/div/ul/li[${j}]/table/tbody/tr/td[1]/div[4]/span[1]`;
                    const descriptionXpath = `//*[@id="menu"]/div/div[${i}]/div[2]/div/ul/li[${j}]/table/tbody/tr/td[1]/div[3]`;

                    // 메뉴 이름
                    const menu = await driver.findElement(By.xpath(menuXpath));
                    const menuName = await menu.getAttribute('innerText');

                    // 메뉴 상세 설명
                    const getDescription = async function() {
                        try {
                            return await driver.findElement(By.xpath(descriptionXpath))
                        }
                        catch {
                            return null
                        }
                    };
                    const description = await getDescription();
                    const descriptionContent = description ? await description.getAttribute('innerText') : null;

                    // 메뉴 가격
                    const price = await driver.findElement(By.xpath(priceXpath));
                    let priceValue = await price.getAttribute('innerText');
                    priceValue = priceValue.slice(0, -1);
                    const idx = priceValue.indexOf(',');
                    priceValue = (priceValue.slice(0, idx) + priceValue.slice(idx+1)) * 1;

                    // console.log(`${j}.  name: ${menuName}, restaurantId: ${id}, label: ${labelName}, description: ${descriptionContent}, price: ${priceValue}`)
                    // console.log(' ')
                    // 메뉴 instance 저장
                    try {
                        const result = models.Menu.create({
                            name: menuName,
                            restaurantId: id,
                            label: labelName,
                            description: descriptionContent,
                            price: priceValue
                        })
                            .then((result) => {
                                console.log(result.name)
                            })
                            .catch((err) => {
                                console.log('err is occurred')
                                console.log(err)
                            })
                    }
                    catch {
                        console.log('failed')
                    }
                    j += 1
                }
                catch (e) {
                    break
                }
            }
            i += 1
        }
        catch {
            break
        }
    }
    driver.close();
    return 'fun crawlingMenus is end'
}


const categories = [
    "전체보기",      // 0
    "1인분주문",    // 1
    "프랜차이즈",    // 2
    "치킨",         // 3
    "피자양식",     // 4
    "중국집",       // 5
    "한식",         // 6
    "일식돈까스",   // 7
    "족발보쌈",     // 8
    "야식",        // 9
    "분식",        // 10
    "카페디저트",  // 11
    "편의점"      // 12
];


function createCategories(models) {
    for (let i = 0; i < 13; i++) {
        (function(j, models) {
            models.Category.create({
                name: categories[j],
                imgUrl: 'path'
            })
                .then((instance) => {
                    console.log(instance.name);
                })
                .catch((err) => {
                    console.log(err);
                })
        })(i, models, categories)
    }
}

// createCategories(models);

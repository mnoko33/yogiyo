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
let resultRest = 0;
let resultMenu = 0;
let RESULT = [];

const restList = async function(i) {
    try {
        const res =  await axios.get('https://www.yogiyo.co.kr/api/v1/restaurants-geo/', {
            params: {
                "items": 1000,
                "lat": loc[i].lat,
                "lng": loc[i].lng,
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
        const limit = restaurantList.length > 300 ? 300 : restaurantList.length;
        let container = [];
        for (let i = 0; i <= limit; i++) {
            sleep(15000);
            (async function(j) {
                const restaurant = restaurantList[j];
                const urlId = restaurant.id; // for crawling

                const isRest = await models.Restaurant.findOne({
                    where: { name: restaurant.name }
                })
                    .then((result) => {
                        return result
                    })
                    .catch((err) => {
                        return 'err'
                    });
                if (isRest === 'err') {
                    console.log(`find-${restaurant.name}에서 에러 발생`);
                    return
                } else if (isRest) {
                    return
                }
                const rest = await models.Restaurant.create({
                    "name": restaurant.name,
                    "category": restaurant.categories.join('::'),
                    "thumbnailUrl": restaurant.thumbnail_url,
                    "address": restaurant.address.split(' ')[2],
                    "lng": restaurant.lng,
                    "lat": restaurant.lat,
                    "isPlus": false,
                    "openTime": restaurant.open_time_description,
                    "deliveryTime": restaurant.estimated_delivery_time_key,
                    "representativeMenus": restaurant.representative_menus,
                    "deliveryFee": restaurant.delivery_fee,
                    "minOrderAmount": restaurant.min_order_amount,
                    "paymentMethods": restaurant.payment_methods.join('::')
                })
                    .then(result => {
                        return result
                    })
                    .catch(err => {
                        return false
                    });
                if (!rest) {
                    console.log(`create-${restaurant.name}에서 에러 발생`);
                    RESULT.push({
                        "type": "restaurant",
                        "name": `${restaurant.name}`
                    });
                    return
                }
                resultRest += 1;
                let instanceId = rest.id;
                let instanceName = rest.name;

                await crawlingMenus(urlId, instanceId, instanceName)
            })(i)

        }
    }
    catch(e) {
        console.log(e);
    }
};

async function startCrawling() {
    for (let i = 0; i < 2; i++) {
        (async (j) => {
           await restList(j)
               .then(() => {
                   console.log('###################success');
               })
               .catch(() => {
                   console.log('###################failed');
               });
        })(i)
    }
}

async function addMissing() {
    const restaurants = await models.Restaurant.findAll()
        .then(rest => {
            return rest
        })
        .catch(err => {
            return false
        });
    if (!restaurants) {
        console.log('err');
        return
    }

    // 메뉴가 없는 식당 리스트
    // const noMenuRests = await restaurants.filter(async rest => {
    //     const menus = await rest.getMenus();
    //     if (!menus.length) {
    //         console.log(rest.name)
    //         return rest
    //     }
    // });
    const noMenuRest = [];
    for (let i = 0; i < restaurants.length; i++) {
        const rest = restaurants[i];
        const menus = await rest.getMenus()
            .then(result => {
                return result
            })
            .catch(err => {
                console.log('메뉴를 불러오는데 오류가 발생했습니다.')
                return false
            });
        if (menus === false || menus.length === 0) {
            console.log('해당 음식점에 메뉴가 없습니다 - ', rest.name);
            noMenuRest.push(rest)
        }
    }
    console.log('############# 메뉴가 없는 음식점의 숫자');
    console.log(noMenuRest.length);
    // api restaurants
    let apiRest = [];
    for (let i = 0; i < 2; i++) {
        (async (j) => {
            const res =  await axios.get('https://www.yogiyo.co.kr/api/v1/restaurants-geo/', {
                params: {
                    "items": 1000,
                    "lat": loc[j].lat,
                    "lng": loc[j].lng,
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
            apiRest.concat(restaurantList);
        })(i)
    }
    console.log(apiRest.length);
    // { urlId: urlID, instanceId: instanceId, instanceName: instanceName,  }
    let target = apiRest.map(rest => {
        for (let i = 0; i < noMenuRest.length; i++) {
            if (noMenuRest[i].name === rest.name) {
                return {
                    "urlId": rest.id,
                    "instanceId": noMenuRest[i].id,
                    "instanceName": noMenuRest[i].name
                }
            }
        }
    })
    console.log(target.length);
    console.log(target);

    // start crawling
    for (let i = 0; i < target.length; i++) {
        (async (j) => {
            await crawlingMenus(target[j].urlId, target[j].instanceId, target[j].instanceName)
        })(i)
    }
}

addMissing();

// startCrawling()
//     .then(() => {
//         console.log('#####################done!!!');
//         console.log(RESULT.length);
//         console.log(RESULT);
//     })
//     .catch(() => {
//         console.log('###################err!!!')
//     });


// 메뉴 크롤링 and 만들기
async function crawlingMenus (urlId, id, name) {
    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

    const url = `https://www.yogiyo.co.kr/mobile/?gclid=Cj0KCQjwuZDtBRDvARIsAPXFx3CcG_91Vgu45cDGd7chcdbWKevyxxOoGVGX7RSM8udHB4mwcYI2o3gaAoXrEALw_wcB#/${urlId}/`;
    await driver.get(url);

    let i = 2;
    while (true) {
        try {
            let labelXpath = `//*[@id="menu"]/div/div[${i}]/div[1]/h4/a/span`;
            // 라벨
            let label = await driver.findElement(By.xpath(labelXpath))
                .then(result => {
                    return result
                })
                .catch(err => {
                   RESULT.push({
                       "type": "menu",
                       "name": `${name}`
                   })
                });
            let labelName = await label.getAttribute('innerText')
                .then(result => {
                    return result
                })
                .catch(err => {
                    RESULT.push({
                        "type": "menu",
                        "name": `${name}`
                    })
                });
            // 메뉴 크롤링
            let j = 1;
            while (true) {
                try {
                    const menuXpath = `//*[@id="menu"]/div/div[${i}]/div[2]/div/ul/li[${j}]/table/tbody/tr/td[1]/div[2]`;
                    const priceXpath = `//*[@id="menu"]/div/div[${i}]/div[2]/div/ul/li[${j}]/table/tbody/tr/td[1]/div[4]/span[1]`;
                    const descriptionXpath = `//*[@id="menu"]/div/div[${i}]/div[2]/div/ul/li[${j}]/table/tbody/tr/td[1]/div[3]`;

                    // 메뉴 이름
                    const menu = await driver.findElement(By.xpath(menuXpath))
                        .then(result => {
                            return result
                        })
                        .catch(err => {
                            RESULT.push({
                                "type": "menu",
                                "name": `${name}`
                            })
                        });
                    const menuName = await menu.getAttribute('innerText')
                        .then(result => {
                            return result
                        })
                        .catch(err => {
                            RESULT.push({
                                "type": "menu",
                                "name": `${name}`
                            })
                        });

                    // 메뉴 상세 설명
                    // const getDescription = async function() {
                    //     try {
                    //         return await driver.findElement(By.xpath(descriptionXpath))
                    //     }
                    //     catch {
                    //         return null
                    //     }
                    // };
                    const description = await driver.findElement(By.xpath(descriptionXpath))
                        .then(result => {
                            return result
                        })
                        .catch(err => {
                            RESULT.push({
                                "type": "menu",
                                "name": `${name}`
                            });
                            return null
                        });
                    // const description = await getDescription();
                    const descriptionContent = description ? await description.getAttribute('innerText') : null;

                    // 메뉴 가격
                    const price = await driver.findElement(By.xpath(priceXpath))
                    let priceValue = await price.getAttribute('innerText');
                    priceValue = priceValue.slice(0, -1);
                    const idx = priceValue.indexOf(',');
                    priceValue = (priceValue.slice(0, idx) + priceValue.slice(idx+1)) * 1;

                    // console.log(`${j}.  name: ${menuName}, restaurantId: ${id}, label: ${labelName}, description: ${descriptionContent}, price: ${priceValue}`)
                    // console.log(' ')
                    // 메뉴 instance 저장
                    try {
                        await models.Menu.create({
                            name: menuName,
                            restaurantId: id,
                            label: labelName,
                            description: descriptionContent,
                            price: priceValue
                        });
                    }
                    catch {
                        RESULT.push({
                            "type": "menu",
                            "name": `${name}`
                        });
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

// 광고 인스턴스 생성
async function createAd(models) {
    for (let i = 2; i<8; i++) {
        await models.Ad.create({
            name: `ad${i}`,
            imgUrl: `/images/ad${i}.jpg`,
            type: "mainAd",
            startDate: "2019-10-22T01:30:18.000Z",
            endDate: "2019-10-22T01:30:18.000Z"
        })
    }
}

// createAd(models);


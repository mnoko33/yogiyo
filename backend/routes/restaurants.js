const express = require('express');
const models = require('../models');
const router = express.Router();
const jwt = require('../functions/jwt');

function getDistance(userLng, userLat, restLng, restLat) {
    function degreeToRadian(deg) {
        return deg * (Math.PI / 180)
    }
    const r = 6371; // 지구 반지름
    const radLng = degreeToRadian(Math.abs(userLng - restLng));
    const radLat = degreeToRadian(Math.abs(userLat - restLat));
    const a = Math.sin(radLat/2) * Math.sin(radLat/2) + Math.cos(degreeToRadian(userLat)) * Math.cos(degreeToRadian(restLat)) * Math.sin(radLng/2) * Math.sin(radLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return r * c // km
}

// 카테고리 리스트 요청
router.get('/categories', async function(req, res, next) {
    try {
        const categories = await models.Category.findAll();
        res.json({
            "status": true,
            "categories": categories
        })
    }
    catch (err) {
        res.json({
            "status": false,
            "message": "카테고리 목록을 불러오는데 실패했습니다.",
            "err": err
        })
    }
});

// 카테고리 별 식당보기 위치의 경우 token 정보에 기반
router.get('/categories/:categoryId', async function (req, res, next) {
    const token = req.headers['x-access-token'];
    const userInfo = await jwt.decodeJWT(token);

    const user = await models.User.findOne({
        where: { id: userInfo.id }
    });

    if (!user) {
        res.json({
            "status": false,
            "message": "일치하는 유저가 없습니다."
        })
    }

    // 유저 위치 정보
    const userLng = user.lng;
    const userLat = user.lat;

    // 카테고리 이름
    const categoryId = req.params.categoryId * 1;
    const category = await models.Category.findOne({
        where: { id: categoryId }
    });
    if (!category) {
        res.json({
            "status": false,
            "message": `${categoryId}번에 해당하는 카테고리가 존재하지 않습니다.`
        })
    }
    // 요기요 플러스
    let restaurants = [];
    if (categoryId === 14) {
        restaurants = await models.Restaurant.findAll({
            where: { isPlus: true }
        })
    } else {
        restaurants = await models.Restaurant.findAll();
    }

    const deliveryLimitDistance = 3;
    restaurants = await restaurants.filter((restaurant) => {
        // 전체 보기
        if ((categoryId === 1 || categoryId === 14) && getDistance(userLng, userLat, restaurant.lng, restaurant.lat) <= deliveryLimitDistance) {
            return restaurant
        }
        // 카테고리별 보기
        else if (restaurant.category.includes(category.name) && getDistance(userLng, userLat, restaurant.lng, restaurant.lat) <= deliveryLimitDistance) {
            return restaurant
        }
    });

    res.json({
        "status": true,
        "numsOfRestaurants": restaurants.length,
        "restaurants": restaurants
    })
});

// 가게 정보 보기
router.get('/:restaurantId', async function (req, res, next) {
   const restaurantId = req.params.restaurantId * 1;
   const restaurant = await models.Restaurant.findOne({
       where: { id: restaurantId }
   })
       .then((result) => {
           return result
       })
       .catch((err) => {
           return res.json({
               "status": false,
               "message": "다음과 같은 이유로 음식점 정보를 불러오는데 실패했습니다.",
               "err": err
           })
       });
    if (restaurant) {
        res.json({
            "status": true,
            "restaurant": restaurant
        })
    } else {
        res.json({
            "status": false,
            "message": "일치하는 음식점이 존재하지 않습니다."
        })
    }
});

// 매장별 상세 정보 보기
router.get('/:restaurantId/info', async function (req, res, next) {
    const restaurantId = req.params.restaurantId * 1;
    const restaurant = await models.Restaurant.findOne({
        where: {id: restaurantId}
    })
        .then((result) => {
            return result
        })
        .catch((err) => {
            return res.json({
                "status": false,
                "message": "메뉴 정보를 불러오는데 실패했습니다.",
                "err": err
            })
        });
    if (!restaurant) {
        res.json({
            "Status": false,
            "message": "일치하는 매장이 존재하지 않습니다."
        })
    } else {
        const restaurantInfo = await models.RestaurantInfo.findOne({
            where: { restaurantId: restaurant.id }
        })
            .then(result => {
                return result
            })
            .catch(err => {
                return res.json({
                    "status": false,
                    "message": "매장 정보를 가져오는데 오류가 발생했습니다.",
                    "err": err
                })
            });
        res.json({
            "status": true,
            "restaurantInfo": restaurantInfo
        })
    }
});

// 매장별 메뉴 보기
router.get('/:restaurantId/menus', async function (req, res, next) {
    const restaurantId = req.params.restaurantId * 1;
    const restaurant = await models.Restaurant.findOne({
        where: {id: restaurantId}
    })
        .then((result) => {
            return result
        })
        .catch((err) => {
            return res.json({
                "status": false,
                "message": "메뉴 정보를 불러오는데 실패했습니다.",
                "err": err
            })
        });
    if (restaurant) {
        const menuList = await restaurant.getMenus()
            .then((result) => {
                return result
            })
            .catch((err) => {
                return res.json({
                    "status": false,
                    "err": err
                })
            });
        let labels = [];
        let menus = {};
        for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i];
            if (labels.includes(menu.label)) {
                menus[menu.label].push(menu)
            } else {
                labels.push(menu.label);
                menus[menu.label] = [menu];
            }
        }

        res.json({
            "status": true,
            "restaurant": restaurant,
            "numsOfMenus": menuList.length,
            "labels": labels,
            "menus": menus
        })
    } else {
        res.json({
            "status": false,
            "message": "일치하는 음식점이 존재하지 않습니다."
        })
    }
});

router.post('/:restaurantId/cart', async function(req, res, next) {
    const token = req.headers['x-access-token'];
    const userInfo = await jwt.decodeJWT(token);
    const userId = userInfo.id;
    let menus = req.body.data.menus;
    const restaurantId =  req.params.restaurantId * 1;
    const cart = await models.Cart.findOne({
        where: { userId: userId }
    })
        .then((cartInstance) => {
            return cartInstance
        })
        .catch((err) => {
            return res.json({
                "status": false,
                "message": "다음과 같은 이유로 장바구니를 생성하는데 실패했습니다.",
                "err": err
            })
        });
    if (cart) {
        // 이미 있는 장바구니에 메뉴를 추가할 때
        if (cart.restaurantId === restaurantId) {
            // 새로운 카트에 메뉴를 추가 또는 제거
            await cart.update({
                menus: menus
            })
        } else {
            // 새로운 장바구니에 메뉴를 추가
            await cart.update({
                restaurantId: restaurantId,
                menus: menus
            })
        }
    } else {
        // 새로운 장바구니 생성
        await models.Cart.create({
            userId: userId,
            restaurantId: restaurantId,
            menus: menus
        })
    }
    menus = menus.split('::');
    let menuList = [];
    for (let i = 0; i < menus.length; i += 2) {
        menuList.push([menus[i], menus[i + 1]])  // [id, count]
    }

    let totalPrice = 0;

    const promisesMenus = menuList.map(async (list) => {
        return new Promise(async (resolve, reject) => {
            const menuId = list[0];
            const menuCount = list[1];
            const menuInstance = await models.Menu.findOne({
                where: { id: menuId * 1 }
            })
                .then(result => {
                    totalPrice += result.price;
                    return {
                        "name": result.name,
                        "count": menuCount * 1,
                        "price": result.price
                    }
                })
                .catch(() => false);
            resolve(menuInstance)
        })
    });
    menus = await Promise.all(promisesMenus);

    res.json({
        "status": true,
        "menus": menus,
        "totalPrice": totalPrice
    })
});

// TODO: check it works well
router.post('/order', async function(req, res, next) {
    const token = req.headers['x-access-token'];
    const userInfo = await jwt.decodeJWT(token);
    const userId = userInfo.id;

    const user = await models.User.findOne({
        where: { id: userId }
    })
        .then(user => {
            return user
        })
        .catch(err => {
            return res.json({
                "status": false,
                "message": "유저정보를 불러오는데 실패했습니다.",
                "err": err
            })
        });


    const cart = await models.Cart.findOne({
        where: { userId: userId }
    })
        .then(user => {
            return user
        })
        .catch(err => {
            return res.json({
                "status": false,
                "message": "장바구니 정보를 가져오는데 실패했습니다.",
                "err": err
            })
        });

    if (!user || !cart) {
        return res.json({
            "status": false,
            "message": !user ? "존재하지 않는 유저입니다." : "장바구니가 비어있습니다."
        })
    } else {
        const history = await models.History.create({
            orderedMenus: cart.menus,
            orderedDate: new Date(),
            orderedAddress: user.address,
            restaurantId: cart.restaurantId,
            userId: user.id
        })
            .then(history => {
                return history
            })
            .catch(err => {
                return res.json({
                    "status": false,
                    "message": "주문기록을 저장하는데 실패했습니다.",
                    "err": err
                })
            });
        // cart 초기화
        // await models.Cart.update({
        //     menus: null
        // })
        //     .then(result => {
        //         console.log('cart is updated')
        //     })
        //     .catch(err => {
        //        res.json({
        //            "status": false,
        //            "message": '장바구니를 초기화하는데 실패했습니다.',
        //            "err": err
        //        })
        //     });

        res.json({
            "status": true,
            "history": history
        })
    }
});

module.exports = router;

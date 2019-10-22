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

    let restaurants = await models.Restaurant.findAll();
    if (categoryId !== 1) {
        restaurants = restaurants.filter((restaurant) => {
            if (restaurant.category.includes(category.name) && getDistance(userLng, userLat, restaurant.lng, restaurant.lat) <= 15) {
                return restaurant
            }
        });
    }
    res.json({
        "status": true,
        "numsOfRestaurants": restaurants.length,
        "restaurants": restaurants
    })
});

// 해당 가게 메뉴 보기
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
        const menus = await restaurant.getMenus()
            .then((result) => {
                return result
            })
            .catch((err) => {
                return res.json({
                    "status": false,
                    "err": err
                })
            });
        res.json({
            "status": true,
            "numsOfMenus": menus.length,
            "menus": menus
        })
    } else {
        res.json({
            "status": false,
            "message": "일치하는 음식점이 존재하지 않습니다."
        })
    }
});

module.exports = router;

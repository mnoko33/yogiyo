const express = require('express');
const models = require('../models');
const router = express.Router();
const jwt = require('jsonwebtoken');

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

function getDistance(userLng, userLat, restLng, restLat) {
    // console.log('0', userLng, userLat, restLng, restLat)
    function degreeToRadian(deg) {
        // console.log(1, deg * (Math.PI / 180))
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
router.get('/categories/:categoryIdx', async function (req, res, next) {
    // jwt 를 통해 유저 location 알아오기
    const token = req.headers['x-access-token'];
    const secret_key = "ssaudy";
    const decodedToken = new Promise(
        ((resolve, reject) => {
            jwt.verify(token, secret_key, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded)
            })
        })
    );
    const decodedUser = await decodedToken
        .then((user) => {
            return user
        })
        .catch((err) => {
            return false
        });

    const user = await models.User.findOne({
        where: { id: decodedUser.id }
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
    const categoryIdx = req.params.categoryIdx * 1;
    const category = await models.Category.findOne({
        where: { id: categoryIdx }
    });
    let restaurants = await models.Restaurant.findAll();
    if (categoryIdx !== 1) {
        restaurants = restaurants.filter((restaurant) => {
            if (restaurant.category.includes(categories[categoryIdx]) && getDistance(userLng, userLat, restaurant.lng, restaurant.lat) <= 15) {
                return restaurant
            }
        });
    }
    res.json({
        "status": true,
        "restaurants": restaurants
    })
});

// 해당 가게 메뉴 보기
router.get('/:restaurantId/menus', async function (req, res, next) {
    const restaurantId = req.params.restaurantId * 1;
    try {
        const restaurant = await models.Restaurant.findOne({
            where: {id: restaurantId}
        });
        if (restaurant) {
            const menus = await restaurant.getMenus();
            res.json({
                "status": true,
                "menus": menus
            })
        }
       res.json({
           "status": false,
           "message": "일치하는 음식점이 존재하지 않습니다."
       })

    } catch (err) {
        res.json({
            "status": false,
            "message": "메뉴 정보를 불러오는데 실패했습니다.",
            "err": err
        })
    }
});

module.exports = router;

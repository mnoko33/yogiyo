const express = require('express');
const models = require('../models');
const router = express.Router();

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

// 카테고리 별 식당보기
// TODO: 장소와 카테고리에 따라 레스토랑 return 해주기
router.get('/categories/:categoryIdx', async function (req, res, next) {
    const categoryIdx = req.params.categoryIdx * 1;
    let restaurants = await models.Restaurant.findAll();
    if (categoryIdx !== 0) {
        restaurants = restaurants.filter((restaurant) => {
            if (restaurant.category.includes(categories[categoryIdx])) {
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
        } else {
           res.json({
               "status": false,
               "message": "일치하는 음식점이 존재하지 않습니다."
           })
        }
    } catch (err) {
        res.json({
            "status": false,
            "message": "메뉴 정보를 불러오는데 실패했습니다.",
            "err": err
        })
    }
});

module.exports = router;

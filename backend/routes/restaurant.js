const express = require('express');
const models = require('../models');
const axios = require('axios');
const router = express.Router();

// 카테고리 별 식당보기
router.get('/', async function (req, res, next) {
    const category = req.headers.category; // TODO: 한글 문제 해결
    let restaurants = await models.Restaurant.findAll();
    restaurants = restaurants.filter((restaurant) => {
        if (restaurant.category.includes(category)) {
            console.log(restaurant.category.includes(category));
            return restaurant
        }
    });
    res.json({
        "status": true,
        "restaurants": restaurants
    })
});

module.exports = router;

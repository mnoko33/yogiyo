const express = require('express');
const router = express.Router();
const models = require('../models');
const jwt = require('../functions/jwt');
const axios = require('axios');
const kakaoConfig = require('../config/kakaoConfig');

// 위치정보 저장
router.post('/address', async function(req, res, next) {
    const token = req.headers['x-access-token'];
    const userInfo = await jwt.decodeJWT(token);
    const userId = userInfo.id;

    // TODO: 변경된 위치 정보를 기반으로 jwt 재발급
    const newLng = req.body.data.lng;
    const newLat = req.body.data.lat;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${newLng}&y=${newLat}`;

    // kakao api 로부터 주소값 받아오기
    async function getResponse() {
        try {
            return await axios.get(url, {
                headers: {
                    Authorization: kakaoConfig.kakaoAuthorization
                }
            })
        } catch (err) {
            return false
        }
    }

    const response = await getResponse();
    if (!response) {
        res.json({
            "status": false,
            "message": "kakao로부터 주소값을 가져오는데 오류가 발생했습니다."
        })
    }

    const newAddress = response.data.documents[0].address_name;

    // user update
    async function updateUser(userId, newLng, newLat, newAddress) {
        try {
            return await models.User.update(
                { address: newAddress, lng: newLng, lat: newLat },
                { where: { id: userId } }
            )
        } catch (e) {
            return false
        }
    }

    updateUser(userId, newLng, newLat, newAddress)
        .then(() => {
            res.json({
                "status": true,
                "address": newAddress,
                "lng": newLng,
                "lat": newLat
            })
        })
        .catch((err) => {
            res.json({
                "status": false,
                "message": "주소 수정에 실패했습니다."
            })
        })
});

// 유저정보
router.get('/user', async function(req, res, next) {
    const token = req.headers['x-access-token'];
    const userInfo = await jwt.decodeJWT(token);
    const userId = userInfo.id;
    const user = await models.User.findOne({
        where: { id: userId }
    })
        .then((user) => {
            return user
        })
        .catch((err) => {
            return res.json({
                "status": false,
                "message": "유저 정보를 불러오는데 실패했습니다.",
                "err": err
            })
        });
    const cart = await user.getCart();
    const idList = cart.menus.split('::');

    const menus = await models.Menu.findAll({
        where: {id: idList}
    });

    res.json({
        "status": true,
        "user": {
            "username": user.username,
            "email": user.email,
            "address": user.address,
            "phone_num": user.phone_num,
        },
        "numsOfCart": menus.length,
        "cart": menus
    })
});

// TODO: url/api/user-info/history (유저 주문 기록 보기)
// TODO: url/api/user-info/history (유저 주문 기록 추가)

module.exports = router;
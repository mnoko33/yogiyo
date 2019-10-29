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

    const newLng = req.body.data.lng;
    const newLat = req.body.data.lat;
    const newAddress = req.body.data.address;

    let url = '';
    if (newAddress) {
        // 주소값으로 위도 경도 찾기
        url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + encodeURI(newAddress);
    } else {
        // 위도 경도로 주소값 찾기
        url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${newLng}&y=${newLat}`;
    }

    // kakao api
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
    } else if (!response.data.documents[0]) {
        res.json({
            "status": true,
            "address": null,
            "lng": null,
            "lat": null,
            "message": "올바르지 않은 주소입니다. 도로명 또는 지번 주소를 입력해주세요."
        })
    } else {
        const resAddress = newAddress ? response.data.documents[0].address_name : response.data.documents[0].address_name;
        const resLng = response.data.documents[0].x;
        const resLat = response.data.documents[0].y;
        console.log(resAddress);
        console.log(resLng);
        console.log(resLat);
        // user update
        async function updateUser(userId, resLng, resLat, resAddress) {
            try {
                return await models.User.update(
                    { address: resAddress, lng: resLng, lat: resLat },
                    { where: { id: userId } }
                )
            } catch (e) {
                return false
            }
        }

        await updateUser(userId, resLng, resLat, resAddress)
            .then(() => {
                res.json({
                    "status": true,
                    "address": resAddress,
                    "lng": resLng,
                    "lat": resLat
                })
            })
            .catch((err) => {
                res.json({
                    "status": false,
                    "message": "주소 수정에 실패했습니다."
                })
            })
    }


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
    const idAndCount = cart.menus.split('::');
    let idList = [];
    let countList = [];
    for (let i = 0; i < idAndCount.length; i += 2) {
        idList.push(idAndCount[i]);
        countList.push(idAndCount[i + 1]);
    }

    const menus = await models.Menu.findAll({
        where: {id: idList}
    });

    let resCart = [];
    for (let i = 0; i < countList.length; i++) {
        resCart.push({
            "id": menus[i].id,
            "name": menus[i].name,
            "count": countList[i],
            "restaurantId": menus[i].restaurantId,
            "label": menus[i].label,
            "description": menus[i].description,
            "price": menus[i].price
        })
    }

    res.json({
        "status": true,
        "user": {
            "username": user.username,
            "email": user.email,
            "address": user.address,
            "phone_num": user.phone_num,
        },
        "numsOfCart": menus.length,
        "cart": resCart
    })
});

// TODO: url/api/user-info/history (유저 주문 기록 보기)
// TODO: url/api/user-info/history (유저 주문 기록 추가)

module.exports = router;
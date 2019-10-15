const express = require('express');
const models = require('../models');
const axios = require('axios');
const router = express.Router();

// 위치정보 저장
router.post('/address', async function(req, res, next) {
    // TODO: body 의 user_id => token(jwt) 으로 대체하기
    const user_id = req.body.user_id;
    const x = req.body.x;
    const y = req.body.y;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`;
    const kakaoAuthorization = "KakaoAK 158e55f2ac87b67c8641e613316155a5";

    // kakao api 로부터 주소값 받아오기
    async function getResponse() {
        try {
            return await axios.get(url, {
                headers: {
                    Authorization: kakaoAuthorization
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
    const address = response.data.documents[0].region_3depth_name

    // user update
    async function updateUser(user_id, x, y) {
        try {
            return await models.Users.update(
                { address: address, location: `${x}::${y}` },
                { where: { id: user_id } }
            )
        } catch (e) {
            return false
        }
    }

    const result = updateUser(user_id, x, y, address);
    if (!result) {
        res.json({
            "status": false,
            "message": "주소 수정에 실패했습니다."
        })
    } else {
        res.json({
            "status": true,
            "address": address,
            "location": `${x}::${y}`
        })
    }
});

module.exports = router;

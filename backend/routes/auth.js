const express = require('express');
const models = require('../models');
const axios = require('axios');
const router = express.Router();

// 회원가입
router.post('/signup', async function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const phone_num = req.body.phone_num;
    // TODO: 중복검사 필요 - findOrCreate
    // TODO: 적합성 검사 필요 username 과 password
    // TODO: password 저장시 bcryptjs 사용
    models.Users.create({
        username: username,
        password: password,
        phone_num: phone_num
    }).then(() => {
        res.json({
            "status": true,
            "message": "회원가입이 완료됐습니다."
        })
    }).catch((err) => {
        res.json({
            "status": false,
            "message": "회원가입이 실패했습니다.",
            "error": err
        })
    })
});

// 위치정보 저장
router.post('/address', async function(req, res, next) {
   // TODO: body 의 user_id => token(jwt) 으로 대체하기
   const user_id = req.body.user_id;
   const x = req.body.x;
   const y = req.body.y;
   const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`;
   const kakaoAuthorization = "KakaoAK 158e55f2ac87b67c8641e613316155a5";
   const response = await axios.get(url, {
       headers: {
           Authorization: kakaoAuthorization
       }
   });
   const user = await models.Users.findOne({
       where: {id:user_id}
   });

   if (user) {
       user.update({
           address: response.data.documents[0].region_3depth_name,
           location: `${x}::${y}`
       }).then((user) => {
           res.json({
               "status": true,
               "address": user.address,
               "location": user.location
           })
       }).catch((err) => {
           res.json({
               "status": false,
               "message": "위치 저장에 실패했습니다.",
               "err": err
           })
       })
   } else {
       res.json({
           "status": false,
           "message": "일치하는 유저가 없습니다."
       })
   }
});

module.exports = router;

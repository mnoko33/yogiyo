const express = require('express');
const models = require('../models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
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

// 로그인
router.post('/login', async function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await models.Users.findOne({
        where: {username: username, password: password}
    });
    if (!user) {
        res.json({
            "status": false,
            "message": "로그인에 실패했습니다."
        })
    } else {
        const secret_key = "ssaudy";
        const payload = {
            "sub": "ssaudy",
            "id": user.id,
            "username": user.username,
            "address": user.address,
            "location": user.location,
            "phone_number": user.phone_num,
        };
        const token = jwt.sign(payload, secret_key);
        res.json({
            "jwt": token
        })
    }
});

module.exports = router;

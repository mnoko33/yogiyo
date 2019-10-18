const express = require('express');
const models = require('../models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');

// token 발행 함수
async function createJWT(user) {
    const secret_key = "ssaudy";
    const payload = {
        "sub": "ssaudy",
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "address": user.address,
        "location": user.location,
        "phone_number": user.phone_num,
    };
    return jwt.sign(payload, secret_key);
}

// 회원가입
router.post('/signup', async function(req, res, next) {
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;  // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;

    const email = req.body.email;
    const password = req.body.password;
    const phone_num = req.body.phone_num;

    // 이메일 중복 체크
    const isEmailDuplicated = await models.User.findOne({
        where: {email: email}
    });
    if (isEmailDuplicated) {
        return res.json({
            "status": false,
            "message": "이메일이 중복됐습니다."
        });
    }

    // 휴대폰 번호 중복 체크
    const isPhoneDuplicated = await models.User.findOne({
        where: {phone_num: phone_num}
    });

    if (isPhoneDuplicated) {
        return res.json({
            "status": false,
            "message": "휴대폰 번호가 중복됐습니다."
        })
    }

    // 이메일, 비밀번호, 전화번호 정규표현식 검사
    if (!emailRegex.test(email) || !passwordRegex.test(password) || !phoneRegex.test(phone_num)) {
        console.log('email regex :', emailRegex.test(email));
        console.log('password regex :', passwordRegex.test(email));
        console.log('phone_num regex :', phoneRegex.test(email));
        return res.json({
            "status": false,
            "message": "잘못된 형식입니다."
        })
    }

    models.User.create({
        username: req.body.username ? req.body.username : email.split('@')[0],
        email: email,
        password: bcrypt.hashSync(password, 8),
        phone_num: phone_num
    }).then((user) => {
        return createJWT(user)
            .then((token) => {
                res.json({
                    "status": true,
                    "message": "회원가입이 완료됐습니다.",
                    "token": token
                })
            })
            .catch((err) => {
                res.json({
                    "status": false,
                    "message": "회원가입이 실패했습니다.",
                    "error": err
                })
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
    const email = req.body.email;
    const password = req.body.password;
    const user = await models.User.findOne({
        where: {email: email}
    });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = await createJWT(user);
        return res.json({
            "status": !!token,
            "jwt": token
        })
    }
    res.json({
        "status": false,
        "message": "아이디 또는 비밀번호가 일치하지 않습니다."
    });
});

module.exports = router;

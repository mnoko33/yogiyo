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
        "lng": user.lng,
        "lat": user.lat,
        "phone_number": user.phone_num,
    };
    // return jwt.sign(payload, secret_key, { expiresIn: '15m' });
    return jwt.sign(payload, secret_key, { expiresIn: '1000h' });
}

// 회원가입
router.post('/signup', async function(req, res, next) {
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;  // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

    const email = req.body.data.email;
    const password = req.body.data.password;
    const phone_num = req.body.data.phone_num;

    // 없는 정보 확인
    if (!email || !password || !phone_num) {
        res.json({
            "status": false,
            "isEmail": !!email,
            "isPassword": !!password,
            "isPhone_num": !!phone_num
        })
    }

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
    const email = req.body.data.email;
    const password = req.body.data.password;

    if (!email || !password) {
        res.json({
            "status": false,
            "isEmail": !!email,
            "isPassword": !!password
        })
    }

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


// 위치정보 저장
router.post('/address', async function(req, res, next) {
    const token = req.headers['x-access-token'];
    const secret_key = "ssaudy";
    const decodedToken = new Promise(
        ((resolve, reject) => {
            jwt.verify(token, secret_key, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded)
            })
        })
    )


    const userInfo = await decodedToken;
    const userId = userInfo.id;

    // TODO: 변경된 위치 정보를 기반으로 jwt 재발급
    const newLng = req.body.data.lng;
    const newLat = req.body.data.lat;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${newLng}&y=${newLat}`;
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
    const newAddress = response.data.documents[0].region_3depth_name

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

module.exports = router;

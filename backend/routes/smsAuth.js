const express = require('express');
const router = express.Router();
const {config, Group} = require('coolsms-sdk-v4');
const conf = require('../config/smsconfig');
const models = require('../models');
const jwt = require('../functions/jwt');

router.post('/certification', async function(req, res, next) {
    // sms api 설정
    config.init({
        apiKey: conf.apiKey,
        apiSecret: conf.apiSecret
    });

    async function send (message, agent = {}) {
        try {
            return await Group.sendSimpleMessage(message, agent);
        } catch (e) {
            throw new Error(e);
        }
    }

    // sms api 사용
    try {
        const code = (() => {
            let code = '';
            for (let i = 0; i < 4; i++) {
                code += Math.floor(Math.random() * 10);
            }
            return code
        })();

        const number = req.body.data.phone_num;
        const message = `[싸우디] 인증번호는 [${code}]입니다. 해당 인증번호를 입력해주세요.`;

        const msg = send({
            to: number,
            text: message,
            type: conf.type,
            from: conf.from
        });

        await models.Sms.findOne({
            where: { phone_num: number }
        })
            .then((sms) => {
                // update
                if (sms) return sms.update({ code: code });
                return models.Sms.create({
                    phone_num: number,
                    code: code
                })
            })
            .catch((err) => {
                res.json({
                    "status": false,
                    "message": "다음과 같은 이유로 인증에 실패했습니다.",
                    "err": err
                })
            });
        res.json({
            "status": true
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            "status": false,
            "message": "메시지 발송을 실패했습니다."
        })
    }
});

router.post('/verification', async function(req, res, next) {
    const code = req.body.data.code;
    const phone_num = req.body.data.phone_num;
    const dbCode = await models.Sms.findOne({
        where: { phone_num: phone_num }
    })
        .then((smsInstance) => {
            return smsInstance.code
        })
        .catch((err) => {
            res.json({
                "status": false,
                "message": "다음과 같은 이유로 인증에 실패했습니다.",
                "error": err
            })
        });

    if (code === dbCode) {
        res.json({
            "status": true,
            "message": "인증이 완료됐습니다."
        })
    } else {
        res.json({
            "status": false,
            "message": "잘못된 코드입니다."
        })
    }
});

module.exports = router;

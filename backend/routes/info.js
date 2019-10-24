const express = require('express');
const router = express.Router();
const models = require('../models');

// 광고
router.get('/ad', async function(req, res, next) {
    try {
        res.json({
            "status": true,
            "ads": await models.Ad.findAll()
        })
    }
    catch (err) {
        res.json({
            "status": false,
            "message": "광고 목록을 불러오는데 실패했습니다.",
            "err": err
        })
    }
});

router.get('/ad/:adId', function(req, res, next) {
    const adId = req.params["adId"];
    res.render('ad.jade', {
        title: `[임시] ${adId}번 광고 페이지입니다. `
    })
});

module.exports = router;
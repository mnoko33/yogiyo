const models = require('../models');

module.exports = async function createAd(startIdx, endIdx, adType) {
    let promiseAds = [];
    for (let i = startIdx; i < endIdx + 1; i++) {
        const promiseAd = new Promise(async (resolve, reject) => {
            resolve(models.Ad.create({
                name: `ad${i}`,
                imgUrl: `/images/ad${i}.jpg`,
                type: adType,
                startDate: "2019-10-22T01:30:18.000Z",
                endDate: "2019-10-22T01:30:18.000Z"
            }))
        });
        promiseAds.push(promiseAd)
    }
    return await Promise.all(promiseAds)
};
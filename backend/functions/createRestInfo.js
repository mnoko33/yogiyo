const models = require('../models');


module.exports = async function() {
    const restaurants = await models.Restaurant.findAll()
    const restPromises = restaurants.map(rest => {
        return new Promise(async (resolve, reject) => {
            let CRN = "000-00-00"; // 사업자 정보
            let restId = String(rest.id);
            if (restId.length === 3) {
               CRN += restId
            } else if (restId.length === 2) {
                CRN += '0' + restId
            } else {
                CRN += "00" + restId
            }
            const restInfo = await models.RestaurantInfo.create({
                "openTime": rest.openTime,
                "minOrderAmount": rest.minOrderAmount,
                "paymentMethods": rest.paymentMethods,
                "name": rest.name,
                "CRN": CRN,
                "restaurantId": rest.id
            });
            resolve(restInfo)
        })
    });
    console.log('작업 시작');
    return Promise.all(restPromises)
};
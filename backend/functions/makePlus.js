const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = async function() {
    const restaurants = models.Restaurant.findAll();
    const restPromises = restaurants.map(rest => {
        return new Promise(async (resolve, reject) => {
            resolve(await rest.update({
                isPlus: true
            }))
        })
    })
};
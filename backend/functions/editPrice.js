const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = async function() {
    const menus = await models.Menu.findAll({
        where: {
            price: { [Op.gt]: 9999 }
        }
    });
    let count = 0;
    const promises = await menus.map(menu => {
       return new Promise((resolve, reject) => {
           async function checkAndUpdate(menu) {
               const price = String(menu.price);
               const x = price.slice(0, 2); // abxxx
               const y = price.slice(2, 4); // xxabx
               const z = price.slice(2); // xxabc
               if (x === y) {
                   count += 1;
                   await menu.update({ price: z * 1 })
                       .then(() => {
                           console.log(`${menu.id} : ${price} => ${z}`);
                       });
               }
           }
           resolve(checkAndUpdate(menu))
       })
    });
    console.log(`price error (${count}) is fixed!`);
};
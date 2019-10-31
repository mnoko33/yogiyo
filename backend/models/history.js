const models = require('../models');

module.exports = function(sequelize, DataTypes) {
    let History = sequelize.define("History", {
        orderedMenus: {
            field: "orderedMenus",
            type: DataTypes.TEXT,
            allowNull: false
        },
        orderedDate: {
            field: "orderedDate",
            type: DataTypes.DATE,
            allowNull: false
        },
        orderedAddress: {
            field: "orderedAddress",
            type: DataTypes.STRING
        }
    }, {
        underscored: false,
        freezeTableName: true,
        tableName: "History"
    });
    // History.associate = function(models) {
    //     History.belongsTo(models.Restaurant, {
    //         foreignKey: 'restaurantId'
    //     });
    //     History.belongsTo(models.User, {
    //         foreignKey: 'userId'
    //     });
    // };
    return History;
};
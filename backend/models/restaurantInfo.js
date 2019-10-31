const models = require('../models');

module.exports = function(sequelize, DataTypes) {
    let RestaurantInfo = sequelize.define("RestaurantInfo", {
        notification: {
            field: "notification",
            type: DataTypes.TEXT,
            unique: false,
            allowNull: true
        },
        openTime: {
            field: "openTime",
            type: DataTypes.STRING,
            defaultValue: "11:00 - 01:00",
            allowNull: true
        },
        number: {
          field: "number",
          type: DataTypes.STRING,
          defaultValue: "141412345678",
          allowNull: true
        },
        minOrderAmount: {
            field: "minOrderAmount",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        paymentMethods: {
            field: "paymentMethods",
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            field: "name",
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        CRN: {
            field: "CRN",
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            defaultValue: "000-00-00001"
        },
        originInfo: {
          field: "originInfo",
          type: DataTypes.TEXT,
          unique: false,
          allowNull: true,
          defaultValue: "원산지 정보가 없습니다."
        }
    }, {
        underscored: false,
        freezeTableName: true,
        tableName: "RestaurantInfo"
    });
    // RestaurantInfo.associate = function(models) {
    //     RestaurantInfo.belongsTo(models.Restaurant, {
    //         foreignKey: 'restaurantId'
    //     });
    // };
    return RestaurantInfo;
};
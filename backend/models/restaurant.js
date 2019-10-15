const models = require('../models');

module.exports = function(sequelize, DataTypes) {
    let Restaurant = sequelize.define("Restaurant", {
        name: {
            field: "name",
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
        },
        category: {
            field: "category",
            type: DataTypes.STRING(50),
            allowNull: false
        },
        thumbnailUrl: {
            field: "thumbnailUrl",
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            field: "address",
            type: DataTypes.STRING(15),
            allowNull: false
        },
        lng: {
            field: "lng",
            type: DataTypes.FLOAT(25),
            allowNull: false
        },
        lat: {
            field: "lat",
            type: DataTypes.FLOAT(25),
            allowNull: false
        },
        openTime: {
            field: "openTime",
            type: DataTypes.STRING(20),
            allowNull: false
        },
        deliveryTime: {
            field: "deliveryTime",
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        representativeMenus: {
            field: "representativeMenus",
            type: DataTypes.STRING(30),
            allowNull: false
        },
        deliveryFee: {
            field: "deliveryFee",
            type: DataTypes.INTEGER(15),
            allowNull: false
        },
        minOrderAmount: {
            field: "minOrderAmount",
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        paymentMethods: {
            field: "paymentMethods",
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "Restaurant"
    });
    Restaurant.associate = function(models) {
        models.Restaurant.hasMany(models.Menu, {
            foreignKey: "restaurantId"
        })
    };
    return Restaurant;
};
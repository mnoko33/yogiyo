const models = require('../models');

module.exports = function(sequelize, DataTypes) {
    let Restaurant = sequelize.define("Restaurant", {
        name: {
            field: "name",
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        category: {
            field: "category",
            type: DataTypes.STRING,
            allowNull: false
        },
        thumbnailUrl: {
            field: "thumbnailUrl",
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            field: "address",
            type: DataTypes.STRING,
            allowNull: false
        },
        lng: {
            field: "lng",
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        lat: {
            field: "lat",
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        openTime: {
            field: "openTime",
            type: DataTypes.STRING,
            allowNull: false
        },
        deliveryTime: {
            field: "deliveryTime",
            type: DataTypes.INTEGER,
            allowNull: true
        },
        representativeMenus: {
            field: "representativeMenus",
            type: DataTypes.STRING,
            allowNull: false
        },
        deliveryFee: {
            field: "deliveryFee",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        minOrderAmount: {
            field: "minOrderAmount",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isPlus: {
            field: "isPlus",
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        paymentMethods: {
            field: "paymentMethods",
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        underscored: false,
        freezeTableName: false,
        tableName: "restaurant"
    });
    // Restaurant.associate = function(models) {
    //     models.Restaurant.hasMany(models.Menu, {
    //         foreignKey: "restaurantId"
    //     });
    //     models.Restaurant.hasMany(models.Cart, {
    //         foreignKey: "restaurantId"
    //     });
    // };
    return Restaurant;
};
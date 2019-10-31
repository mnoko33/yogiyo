module.exports = function(sequelize, DataTypes) {
    let Cart = sequelize.define("Cart", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        restaurantId: {
            field: "restaurantId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        menus: {
            field: "menus",
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        underscored: false,
        freezeTableName: false,
        tableName: "cart"
    });
    return Cart;
};
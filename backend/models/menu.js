module.exports = function(sequelize, DataTypes) {
    let Menu = sequelize.define("Menu", {
        name: {
            field: "name",
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
        },
        price: {
            field: "price",
            type: DataTypes.INTEGER(15),
            allowNull: false
        },
        restaurantId: {
            field: "restaurantId",
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "Menu"
    });
    return Menu;
};
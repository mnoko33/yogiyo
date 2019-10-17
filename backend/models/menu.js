module.exports = function(sequelize, DataTypes) {
    let Menu = sequelize.define("Menu", {
        name: {
            field: "name",
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        restaurantId: {
            field: "restaurantId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        label: {
          field: "label",
          type: DataTypes.STRING,
          allowNull: true
        },
        price: {
            field: "price",
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: false,
        freezeTableName: true,
        tableName: "Menu"
    });
    return Menu;
};
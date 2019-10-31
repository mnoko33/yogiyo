module.exports = function(sequelize, DataTypes) {
    let Category = sequelize.define("Category", {
        name: {
            field: "name",
            type: DataTypes.STRING,
            allowNull: false
        },
        imgUrl: {
            field: "imgUrl",
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        underscored: false,
        freezeTableName: false,
        timestamps: false,
        tableName: "category"
    });
    return Category;
};
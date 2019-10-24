module.exports = function(sequelize, DataTypes) {
    let Tos = sequelize.define("Tos", {
        title: {
            field: "title",
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            field: "content",
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        underscored: false,
        freezeTableName: true,
        tableName: "Tos"
    });
    return Tos;
};
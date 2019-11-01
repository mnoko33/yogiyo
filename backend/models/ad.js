module.exports = function(sequelize, DataTypes) {
    let Ad = sequelize.define("Ad", {
        name: {
            field: "name",
            type: DataTypes.STRING,
            allowNull: false
        },
        imgUrl: {
            field: "imgUrl",
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            field: "type",
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            field: "startDate",
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            field: "endDate",
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        underscored: false,
        freezeTableName: false,
        tableName: "ad"
    });
    return Ad;
};
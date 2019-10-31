module.exports = function(sequelize, DataTypes) {
    let Sms = sequelize.define("Sms", {
        phone_num: {
            field: "phone_num",
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            field: "code",
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        underscored: false,
        freezeTableName: true,
        tableName: "sms"
    });
    return Sms;
};
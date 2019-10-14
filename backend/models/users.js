module.exports = function(sequelize, DataTypes) {
    let Users = sequelize.define("Users", {
        username: {
            field: "username",
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },
        password: {
            field: "password",
            type: DataTypes.STRING(50),
            allowNull: false
        },
        address: {
            field: "address",
            type: DataTypes.STRING(15),
            allowNull: true
        },
        location: {
          field: "location",
          type: DataTypes.STRING(40),
          allowNull: true
        },
        phone_num: {
            field: "phone_num",
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "Users"
    });
    return Users;
};
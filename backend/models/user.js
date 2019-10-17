module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        username: {
            field: "username",
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
          field: "email",
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
            field: "password",
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            field: "address",
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
          field: "location",
          type: DataTypes.STRING,
          allowNull: true
        },
        phone_num: {
            field: "phone_num",
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        underscored: false,
        freezeTableName: true,
        tableName: "User"
    });
    return User;
};
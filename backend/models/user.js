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
        lng: {
            field: "lng",
            type: DataTypes.DOUBLE,
            allowNull: true

        },
        lat: {
            field: "lat",
            type: DataTypes.DOUBLE,
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
        freezeTableName: false,
        tableName: "user"
    });
    // User.associate = function(models) {
    //     models.User.hasOne(models.Cart, {
    //         foreignKey: "userId"
    //     })
    // };
    return User;
};
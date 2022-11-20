const Sequelize = require("sequelize");
const sequelize = require("../db/index");

const User = sequelize.define(
    "users",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false },
        phoneNumber: { type: Sequelize.INTEGER, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
    },
    { tableName: "users" }
);
User.sync();

module.exports = User;

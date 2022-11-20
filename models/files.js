const Sequelize = require("sequelize");
const sequelize = require("../db/index");

const File = sequelize.define(
  "files",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    filename: { type: Sequelize.STRING, allowNull: false },
    extension: { type: Sequelize.STRING, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false },
    size: { type: Sequelize.STRING, allowNull: false },
    userId: { type: Sequelize.STRING, allowNull: false },
    uploadDate: { type: Sequelize.DATE, allowNull: false },
  },
  { tableName: "files" }
);
// File.belongsTo(User, { foreignKey: "userId" });
File.sync();

module.exports = File;

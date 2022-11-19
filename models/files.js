const Sequelize = require('sequelize');
const sequelize = require('../db/index');
  
const File = sequelize.define('files', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: { type: Sequelize.STRING, allowNull:false },
    extension: { type: Sequelize.STRING, allowNull:false },
    type: { type: Sequelize.STRING, allowNull:false },
    size: { type: Sequelize.STRING, allowNull: false },
    uploadDate: { type: Sequelize.DATE, allowNull: false },
},{tableName: "files"})
File.sync()

module.exports = File
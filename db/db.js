const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'web_ass6', 
  process.env.DB_USER || 'postgres', 
  process.env.DB_PASSWORD || 'admin', 
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
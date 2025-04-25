const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    username: { 
      type: DataTypes.TEXT,  
    },
    email: { 
      type: DataTypes.TEXT, 
      unique: true
    },
    password: { 
      type: DataTypes.STRING(60),
    },
    role:{
      type: DataTypes.TEXT,
      defaultValue: 'user'
    }
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

module.exports = User;
'use strict';
const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }, 
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passwordResetToken: {
          type: DataTypes.STRING,
      },
      passwordResetExpires: {
          type: DataTypes.DATE,
      },
      token: {
          type: DataTypes.STRING,
      },
      facebook: {
          type: DataTypes.STRING,
      },
      isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
      },
      idRol: {
        type: DataTypes.STRING,
        references: {
          model: "rol",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};

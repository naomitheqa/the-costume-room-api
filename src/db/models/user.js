"use strict";
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      hashid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      utype: {
        type: DataTypes.ENUM("ADMIN, GENERAL"),
        allowNull: false,
      },
      enableExpiry: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      expiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      isFirstLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};

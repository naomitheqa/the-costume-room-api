"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // define association here
    }
  }
  item.init(
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
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      count: DataTypes.INTEGER,
      status: DataTypes.ENUM("OUT", "IN"),
      group: DataTypes.ENUM("SENIORS", "TEENS", "JUNIORS"),
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Logo.png",
      },
    },
    {
      sequelize,
      modelName: "item",
    }
  );
  return item;
};

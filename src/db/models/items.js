"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      count: DataTypes.INTEGER,
      status: DataTypes.ENUM("OUT", "IN"),
      group: DataTypes.ENUM("SENIORS", "TEENS", "JUNIORS"),
    },
    {
      sequelize,
      modelName: "item",
    }
  );
  return item;
};

/*eslint-disable*/

import { Sequelize, DataTypes } from "sequelize";
import db from "../utils/dbConnect";
import Product from "../models/Product.seq";

const Class = db.define("class", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name is empty" },
    },
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Type is empty." },
    },
  },
  attributes: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
  },
});

Class.hasMany(Product);
Product.belongsTo(Class);

db.sync({ alter: true })
  .then(() => {})
  .catch((err) => console.log(err));

module.exports = Class;

/*eslint-disable*/

import { Sequelize, DataTypes } from "sequelize";
import db from "../utils/dbConnect";

const Product = db.define("product", {
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
  //   classId: {
  //     type: DataTypes.UUID,
  //     allowNull: false,
  //     unique: { msg: "Class id is already here." },
  //     validate: {
  //       notEmpty: { msg: "Class id is empty." },
  //     },
  //   },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Desc is empty." },
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Price is empty." },
    },
  },
  list: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  attributes: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    validate: {
      notEmpty: { msg: "attributes is empty." },
    },
  },
});

Product.sync()
  .then(() => {})
  .catch((err) => console.log(err));

module.exports = Product;

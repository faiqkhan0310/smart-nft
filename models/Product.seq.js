/*eslint-disable*/

import { DataTypes } from "sequelize";
import db from "../utils/dbConnect";
import ProductAttr from "./product_attributes";

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
});

Product.hasMany(ProductAttr, { onDelete: "cascade", hooks: true });
ProductAttr.belongsTo(Product);

Product.sync()
  .then(() => {})
  .catch((err) => console.log(err));

module.exports = Product;

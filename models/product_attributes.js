/*eslint-disable*/

import { DataTypes } from "sequelize";
import db from "../utils/dbConnect";

const ProductAttributes = db.define("productAttribute", {
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

  immutable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Type is empty." },
    },
  },

  value: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Value is empty." },
    },
  },
});

ProductAttributes.sync()
  .then(() => {})
  .catch((err) => console.log(err));

module.exports = ProductAttributes;

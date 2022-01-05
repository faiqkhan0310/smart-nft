/*eslint-disable*/

import { DataTypes } from "sequelize";
import db from "../utils/dbConnect";

const ClassAttributes = db.define("classAttribute", {
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
});

ClassAttributes.sync()
  .then(() => {})
  .catch((err) => console.log(err));

module.exports = ClassAttributes;

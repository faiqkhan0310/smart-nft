/*eslint-disable*/

import { Sequelize, DataTypes } from "sequelize";
import db from "../utils/dbConnect";
import bcrypt from "bcryptjs";

const Admin = db.define("admin", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name is missing" },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "This email is already registered." },
    validate: {
      isEmail: { msg: "In valid email." },
      notEmpty: { msg: "Email is missing." },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Password is missing." },
    },
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 2,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isFirstLogin: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Admin.beforeCreate((admin, options) => {
  const salt = bcrypt.genSaltSync(10);
  admin.password = bcrypt.hashSync(admin.password, salt);
});

Admin.sync()
  .then(() => console.log("admins table creatd."))
  .catch((err) => console.log(err));

module.exports = Admin;

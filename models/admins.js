/*eslint-disable*/
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { isEmail } from "validator";

const AdminsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required."],
  },

  verified: {
    type: Boolean,
    default: true,
  },
  role: {
    type: Number,
  },

  createdAt: { type: Date, default: Date.now },
});

AdminsSchema.pre("save", function (next) {
  this.role = 2;
  if (this.password) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

export default mongoose.models.admin || mongoose.model("admin", AdminsSchema);

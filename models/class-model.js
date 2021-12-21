/*eslint-disable*/

import mongoose from "mongoose";
// require("./Product");
// var Product = mongoose.model("Product");
// require("./Product");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "products",
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Type is required!"],
    trim: true,
  },
  attributes: {
    type: [],
    required: [true, "Attribute is required!"],
    trim: true,
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.class || mongoose.model("class", classSchema);

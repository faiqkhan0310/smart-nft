/*eslint-disable*/

import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
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

export default mongoose.models.Classes ||
  mongoose.model("Classes", classSchema);

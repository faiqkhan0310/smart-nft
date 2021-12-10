/*eslint-disable*/

import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Country is required!"],
    trim: true,
  },
  publicAddress: {
    type: String,
    required: [true, "Public Address is required!"],
    trim: true,
  },
  artistId: {
    type: String,
    required: [true, "Artist id is required"],
    trim: true,
  },
  telephone_no: {
    type: String,
    trim: true,
  },
  insta_link: {
    type: String,
    trim: true,
  },
  portfolio_link: {
    type: String,
    trim: true,
    required: [true, "Portfolio link is required"],
  },
  status: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Creator ||
  mongoose.model("Creator", creatorSchema);

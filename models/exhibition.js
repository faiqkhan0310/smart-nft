/*eslint-disable*/
import mongoose from "mongoose";
const ExhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  startingDate: {
    type: Date,
    trim: true,
  },
  endingDate: {
    type: Date,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  coverImage: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  artists: [],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Exhibiton ||
  mongoose.model("Exhibiton", ExhibitionSchema);

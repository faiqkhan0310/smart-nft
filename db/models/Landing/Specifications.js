import mongoose from "mongoose";

const SpecificationSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, "Heading is required!"],
    trim: true,
  },
  subHeading: {
    type: String,
    required: [true, "Sub-heading is required!"],
    trim: true,
  },
  image: {
    type: String,
  },
  heading2: {
    type: String,
    required: [true, "Heading 2 is required!"],
    trim: true,
  },
  subHeading2: {
    type: String,
    required: [true, "Sub-heading 2 is required!"],
    trim: true,
  },
  image2: {
    type: String,
  },
  cards: {
    type: [{ title: { type: String }, description: { type: String } }],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Specification ||
  mongoose.model("Specification", SpecificationSchema);

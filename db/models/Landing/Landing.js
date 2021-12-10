import mongoose from "mongoose";

const LandingSchema = new mongoose.Schema({
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
  images: {
    type: [{ url: { type: String } }],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Landing ||
  mongoose.model("Landing", LandingSchema);

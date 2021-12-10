import mongoose from "mongoose";

const MarketingSchema = new mongoose.Schema({
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
  cards: {
    type: [
      {
        title: { type: String },
        description: { type: String },
        imageUrl: { type: String },
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Marketing ||
  mongoose.model("Marketing", MarketingSchema);

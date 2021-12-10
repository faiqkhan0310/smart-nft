import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  PublicAddress: {
    type: String,
    required: [true, "Address is required!"],
    trim: true,
  },
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
  address: {
    type: String,
    required: [true, "Address is required!"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Address is required!"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Address is required!"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone is required!"],
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Address ||
  mongoose.model("Address", AddressSchema);

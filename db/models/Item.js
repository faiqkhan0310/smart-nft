import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
  },
  Description: {
    type: String,
    trim: true,
  },
  Price: {
    type: String,
    trim: true,
  },
  Category: {
    type: String,
    trim: true,
  },
  FileType: {
    type: String,
    trim: true,
  },
  Resolution: {
    type: String,
    trim: true,
  },
  CreatorId: {
    type: String,
    trim: true,
  },
    NFTId: {
    type: String,
    trim: true,
  },
  MintTransaction: {
    type: String,
    trim: true,
  },
  Url: {
    type: String,
    trim: true,
  },
  
  Status: {
    type: Boolean,
    default: true,
  },
  
  Minted: {
    type: Boolean,
  },
  createdAt: { type: Date, default: Date.now ,timezone: 'Asia/Dubai'},
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);

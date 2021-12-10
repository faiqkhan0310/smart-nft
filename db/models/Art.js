import mongoose from "mongoose";

const ArtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
  },
  Description: {
    type: String,
    trim: true,
  },
  PriceBNB: {
    type: String,
    trim: true,
  },
  LatestBid: {
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
  PublicAddressBidWinner: {
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
  OwnerId: {
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
  UrlCertificate: {
    type: String,
    trim: true,
  },
  ContractAddress: {
    type: String,
    trim: true,
  },
  Status: {
    type: Boolean,
    default: true,
  },
  OnSale: {
    type: Boolean,
    default: true,
  },
  Physical: {
    type: Boolean,
  },
  Minted: {
    type: Boolean,
  },
  Featured: {
    type: Boolean,
    default: false,
  },
  Auctioned: {
    type: Boolean,
  },
  StartAuction: { type: Date ,timezone: 'Asia/Dubai'},
  EndAuction: { type: Date ,timezone: 'Asia/Dubai'},
  createdAt: { type: Date, default: Date.now ,timezone: 'Asia/Dubai'},
});

export default mongoose.models.Art || mongoose.model("Art", ArtSchema);

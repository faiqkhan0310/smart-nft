import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  ArtistName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  Description: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
  },
  backPic: {
    type: String,
    trim: true,
  },
  facebook: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  memberStatus: {
    type: Boolean,
  },

  portfolio: {
		type: String,
		trim: true,
	},

  PublicAddress: {
    type: String,
    required: [true, "Address is required!"],
    trim: true,
  },
  nonce: {
    type: Number,
    default: Math.floor(Math.random() * 10000),
  },
  isCreator: {
		type: Boolean,
		default:false
	  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Artist || mongoose.model("Artist", ArtistSchema);

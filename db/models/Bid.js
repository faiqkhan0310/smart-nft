import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const BidSchema = new mongoose.Schema({
	ArtId: {
		type: ObjectId,
	},
	ArtistId: {
		type: String,
		trim: true,
	},
	PublicAddress: {
		type: String,
		trim: true,
	},
	Bid: {
		type: Number,
		trim: true,
	},
	Win: {
		type: Boolean,
		trim: true,
	},
	WinDate: {
		type: Date,
		trim: true,
	},

	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bid ||
	mongoose.model("Bid", BidSchema);

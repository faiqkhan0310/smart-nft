import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const ArtLogSchema = new mongoose.Schema({
	ArtId: {
		type: ObjectId,
	},
	ArtistId: {
		type: String,
		trim: true,
	},
	Description: {
		type: String,
		trim: true,
	},

	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ArtLog ||
	mongoose.model("ArtLog", ArtLogSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
	email: {
		type: String,
		required: [false, "Email is required!"],
		trim: true,
	},
	PublicAddress: {
		type: String,
		required: [true, "Address is required!"],
		trim: true,
	},
	nonce: {
		type: Number,
		trim: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User ||
	mongoose.model("User", UserSchema);

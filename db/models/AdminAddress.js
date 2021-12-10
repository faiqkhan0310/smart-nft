import mongoose from "mongoose";

const AdminAddressSchema = new mongoose.Schema({
	PublicAddress: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
	
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AdminAddress ||
	mongoose.model("AdminAddress", AdminAddressSchema);

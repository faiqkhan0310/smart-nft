import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
	Description: {
		type: String,
		trim: true,
	},
	ImgUrl :{
		type: String,
		trim: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Category ||
	mongoose.model("Category", CategorySchema);

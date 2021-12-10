import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
	SellerId: {
		type: String,
		trim: true,
	},
	BuyerId: {
		type: String,
		trim: true,
	},
	ArtId: {
		type: String,
		trim: true,
	},	
	PriceBNB: {
		type: String,
		trim: true,
	},	
	Description: {
		type: String,
		trim: true,
	},	

	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Transaction ||
	mongoose.model("Transaction", TransactionSchema);

const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
		description: { type: String, required: true },
        image_url: { type: String },
        category: { type: String },
		link: { type: String, required: true },
        threshold_price:{ type: Number, required: true },
        current_price:{ type: Number, required: true },
		user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Link to user
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

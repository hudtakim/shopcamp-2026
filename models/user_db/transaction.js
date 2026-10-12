var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/user_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

var  transactionSchema = new mongoose.Schema({	//products
	userId 			: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	sellerId		: String,
	productId 		: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
	cartId			: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"},
	orderId			: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
	bill			: Number,
	paymentMethod	: String,
	status			: String, //dibayar, diproses, dikirim, selesai, ditolak
	transactionDate	: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
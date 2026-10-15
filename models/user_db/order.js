var mongoose = require("mongoose");
var userDb = require("../database").userDb;

var orderSchema = new mongoose.Schema({	//carts
	userId 		: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	productId 	: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
	cartId		: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"},
	itemQuantity: String,
	fullName	: String,
	phone		: String,
	address		: String,
	postCode	: String,
	message		: String,
	kurir		: String		
});
module.exports = userDb.model("Order", orderSchema);
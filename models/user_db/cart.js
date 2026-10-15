var database = require("../database");
var mongoose = database.mongoose;
var userDb = database.userDb;

var cartSchema = new mongoose.Schema({	//products
	userId 		: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	productId	: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
	thumbnail	: String,
	itemName	: String,
	price		: Number,		
	quantity	: Number
});
module.exports = userDb.model("Cart", cartSchema);
var mongoose = require("mongoose");
var userDb = require("../database").userDb;

var  productSchema = new mongoose.Schema({	//products
	userId		: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	name		: String,
	image1		: String,
	image2		: String,
	image3		: String,
	price		: Number,
	description	: String,
	
});
module.exports = userDb.model("Product", productSchema);
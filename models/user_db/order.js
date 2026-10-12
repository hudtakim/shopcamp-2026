var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/user_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

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
module.exports = mongoose.model("Order", orderSchema);
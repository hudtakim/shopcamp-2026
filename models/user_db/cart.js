var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/user_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

var cartSchema = new mongoose.Schema({	//products
	userId 		: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	productId	: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
	thumbnail	: String,
	itemName	: String,
	price		: Number,		
	quantity	: Number
});
module.exports = mongoose.model("Cart", cartSchema);
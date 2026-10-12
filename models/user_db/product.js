var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/user_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

var  productSchema = new mongoose.Schema({	//products
	userId		: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	name		: String,
	image1		: String,
	image2		: String,
	image3		: String,
	price		: Number,
	description	: String,
	
});
module.exports = mongoose.model("Product", productSchema);
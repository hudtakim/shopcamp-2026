var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product");

router.post("/products", isLoggedIn,function(req, res){	// Create or add a New Product
	var newProduct = req.body.product;
	newProduct.userId = req.user._id;
	Product.create(newProduct, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/"+req.user.username+"/products");
		}
	});
});

module.exports = router;

//------------is Login ? middleware ---------------------
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}
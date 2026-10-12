var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product");
var Cart = require("../models/user_db/cart");

router.get("/:un/order/:id", isLoggedIn,function(req, res){	//Show Create Order Page 
	Cart.findById(req.params.id, function(err, selectedCart){  
		if(err){
			console.log(err);
			res.render("notfound.ejs");
		}else{
			Product.findById(selectedCart.productId, function(err, foundProduct){
				if(err){
					console.log(err);
				}else{
					res.render("user/order.ejs", {cart: selectedCart, product: foundProduct});	
				}
			});
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
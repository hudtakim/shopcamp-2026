var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product"); 
var Cart = require("../models/user_db/cart");
var Order = require("../models/user_db/order");

router.get("/:un/payment/:id", isLoggedIn,function(req, res){	//show Invoice and payment method
 	Order.findById(req.params.id, function(err, foundOrder){
		if(err){
			console.log(err);
		}else{
			Product.findById(foundOrder.productId, function(err, foundProduct){
				if(err){
					console.log(err);
				}else{
					res.render("user/checkout.ejs", {theOrder: foundOrder, product: foundProduct});
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
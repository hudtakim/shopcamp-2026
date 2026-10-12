var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product");
var Cart = require("../models/user_db/cart");

router.get("/:un/cart", isLoggedIn,function(req, res){	//Show User's Shopping Cart
	Cart.find({'userId': req.user._id}, function(err, foundCart){
		if(err){
			console.log(err);
		}else{
			res.render("user/cart.ejs", {theCart: foundCart});
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
var express = require("express");
var router = express.Router();
var Cart = require("../models/user_db/cart");
var Order = require("../models/user_db/order");

router.post("/:un/order/:id", isLoggedIn,function(req, res){	// Create a New Order or Transaction
	Cart.findById(req.params.id, function(err, foundCart){
		if(err){
			console.log(err);
		}else{
			var newOrder = {
				userId		: foundCart.userId,
				productId	: foundCart.productId,
				cartId		: foundCart._id,
				itemQuantity: foundCart.quantity,
				fullName	: req.body.fullName,
				phone		: req.body.phone,
				address		: req.body.address,
				postCode	: req.body.postCode,
				message		: req.body.message,
				kurir		: req.body.kurir	
			}
			Order.create(newOrder, function(err, newlyCreated){
				if(err){
					console(err);
				}else{
					var id = newlyCreated._id;
					var un = req.user.username;
					res.redirect("/"+un+"/payment/"+id);
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
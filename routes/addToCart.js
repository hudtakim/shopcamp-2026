var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product");
var Cart = require("../models/user_db/cart");

router.post("/add/:id/cart", isLoggedIn, function(req, res){	// add selected product to cart
	Product.findById(req.params.id, function(err, selectedProduct){
		if(err){
			console.log(err);
			res.render("notfound.ejs");
		}else{	
			var newCart = {
				userId		: req.user._id,
				productId	: selectedProduct._id,
				thumbnail	: selectedProduct.image1,
				itemName	: selectedProduct.name,
				price		: selectedProduct.price,
				quantity	: req.body.quantity
			}
			if(req.user._id === selectedProduct.userId){
				res.send("<h1>JANGAN CURANG - TIDAK BISA MEMBELI PRODUK SENDIRI</h1>");
			}else{
				Cart.create(newCart, function(err, newlyCreated){
					if(err){
						console.log(err);
					}else{
						if(req.body.tombolAction === "cart"){
							res.redirect("/"+req.user.username+"/cart");
						}else{
							res.redirect("/"+req.user.username+"/order/"+newlyCreated._id);
						}
					}
				});
			}
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
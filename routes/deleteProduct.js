var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product");

router.delete("/:un/products/:id", isLoggedIn,function(req, res){	//Delete Product
	Product.findByIdAndRemove(req.params.id, function(err){
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
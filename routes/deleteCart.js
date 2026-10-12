var express = require("express");
var router = express.Router();
var Cart = require("../models/user_db/cart");

router.delete("/delete/cart/:id", isLoggedIn,function(req, res){	//Delete product from Cart
	Cart.findByIdAndRemove(req.params.id, function(err){ 
		if(err){
			console.log(err);
		}else{
			res.redirect("/"+req.user.username+"/cart");	
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
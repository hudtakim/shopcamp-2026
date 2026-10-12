var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product");

router.put("/admin/products/:id", isLoggedIn, function(req, res){	//Update Product
	Product.findByIdAndUpdate(req.params.id, req.body, function(err, selectedProduct){
		if(err){
			console.log(err);
		}else{
			var id = selectedProduct._id;
			var un = req.user.username;
			res.redirect("/"+ un +"/products/" + id);	
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
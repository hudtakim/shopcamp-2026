var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product");

router.get("/:un/products/:id/edit", isLoggedIn,function(req, res){	//Show Edit Product Page
	Product.findById(req.params.id, function(err, selectedProduct){
		if(err){
			console.log(err);
		}else{
			res.render("product/edit.ejs", {theProduct: selectedProduct});	
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
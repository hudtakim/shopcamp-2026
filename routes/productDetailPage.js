var express = require("express");
var router = express.Router();
var User = require("../models/user_db/user");
var Product = require("../models/user_db/product");

router.get("/products/:id", function(req, res){	//Show Product Detail
	Product.findById(req.params.id).populate("comments").exec(function(err, selectedProduct){
		if(err){
			console.log(err);
		}else{
			User.findById(selectedProduct.userId, function(err, foundUser){
				res.render("product/show.ejs", {theProduct: selectedProduct, seller: foundUser});
			});	
		}
	});
});

module.exports = router;
var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product");

router.get("/products", function(req, res){		//Show Index page
	Product.find({}, function(err, products){
		if(err){
			console.log(err);
		}else{
			res.render("index.ejs", {theProduct: products});
		}
	});
});

module.exports = router;
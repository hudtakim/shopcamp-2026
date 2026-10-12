var express = require("express");
var router = express.Router();
var Product = require("../models/user_db/product");

router.get("/products/search/:keyword", function(req, res){		//Search Product Result
	var keyword = req.params.keyword;
	Product.find({'name': {$regex: ".*"+keyword+".*", $options:"i"}}, function(err, products){
		if(err){
			console.log(err);
		}else{
			res.render("indexSearch.ejs", {theProduct: products, keyword: keyword});
		}
	});
});

module.exports = router;
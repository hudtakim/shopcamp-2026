var express = require("express");
var router = express.Router();

router.search("/products/search", function(req, res){	//Search Product by Name
	var keyword = req.body.keyword;
	res.redirect("/products/search/"+keyword);
});

module.exports = router;
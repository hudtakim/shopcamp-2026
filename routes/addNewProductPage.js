var express = require("express");
var router = express.Router();

router.get("/products/new", isLoggedIn,function(req, res){	//show Add New Product page
	res.render("product/new.ejs");
});

module.exports = router;

//------------is Login ? middleware ---------------------
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}
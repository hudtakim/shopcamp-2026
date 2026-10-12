var express = require("express");
var router = express.Router();

router.get("/:un/topup", isLoggedIn,function(req, res){	//show Invoice and payment method
	res.render("user/topUp.ejs");
});

module.exports = router;

//------------is Login ? middleware ---------------------
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}
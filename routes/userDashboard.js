var express = require("express");
var router = express.Router();
var User = require("../models/user_db/user");

router.get("/:un/dashboard", isLoggedIn,function(req, res){	//User Dashboard Page
	if(req.user.username == req.params.un){
		User.findOne({'username': req.params.un}, function(err, findOne){
			if(err){
				console.log(err);
			}else{
				res.render("user/orderlist.ejs", {user: findOne});
			}
		});
	}else{
		res.render("notfound.ejs");	
	}
});

module.exports = router;

//------------is Login ? middleware ---------------------
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}
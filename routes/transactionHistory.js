var express = require("express");
var router = express.Router();
var Transaction = require("../models/user_db/transaction");

router.get("/:un/transactions", isLoggedIn,function(req, res){	//Show user transactions history
	Transaction.find({$or: [
					  {'userId': req.user._id}, 
					  {'sellerId' : req.user._id}
					 ]}, 
	function(err, foundOne){
		if(err){
			console.log(err);
		}else{
			res.render("user/transactions.ejs", {transaction: foundOne});	
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
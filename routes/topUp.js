var express = require("express");
var router = express.Router();
var User = require("../models/user_db/user")
var MemberMasterCoinCard = require("../models/fintech_db/memberMasterCoinCard");

router.post("/:un/topup", isLoggedIn,function(req, res){	// Create a New Order or Transaction
	MemberMasterCoinCard.findOne({'userId': req.user._id}, function(err, foundOne){
		if(err){
			console.log(err);
		}else{
			var topUpNominal = parseInt(req.body.currentSaldoCoin, 10);
			var currentSaldoCoin = foundOne.currentSaldoCoin;
			var newSaldoCoin = {currentSaldoCoin: topUpNominal + currentSaldoCoin};
			
			MemberMasterCoinCard.findByIdAndUpdate(foundOne._id, newSaldoCoin, {new: true}, function(err, foundCard){
				if(err){
					console.log(err)
				}else{
					var newSaldo = {saldo: foundCard.currentSaldoCoin}
					User.findByIdAndUpdate(req.user._id, newSaldo, function(err, foundUser){
						if(err){
							console.log(err);
						}else{
							res.redirect("/products");
						}
					});
				}
			});
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
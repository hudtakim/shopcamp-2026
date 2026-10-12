var express = require("express");
var router = express.Router();
var User = require("../models/user_db/user");
var Transaction = require("../models/user_db/transaction");
var MemberMasterCoinCard = require("../models/fintech_db/memberMasterCoinCard");

router.post("/:un/transaction/:id/phase", isLoggedIn,function(req, res){	//Update transaction status
	Transaction.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, foundTransaction){
		if(err){
			console.log(err);
		}else{
			if(foundTransaction.status == "DITOLAK"){
				User.findById(foundTransaction.userId, function(err, foundBuyer){
					if(err){console.log(err);}
					else{
						var buyerSaldo = { currentSaldoCoin: foundBuyer.saldo + foundTransaction.bill}
						MemberMasterCoinCard.findOneAndUpdate({'userId': foundTransaction.userId}, buyerSaldo,
						{new: true}, function(err, foundBuyerCard){
							if(err){
								console.log(err);
							}else{
								var newBuyerSaldo = {saldo: foundBuyerCard.currentSaldoCoin}
								User.findByIdAndUpdate(foundBuyerCard.userId, newBuyerSaldo, function(err, foundOne){
									if(err){
										console.log(err);
									}else{
										res.redirect("/"+req.user.username+"/invoice/"+foundTransaction._id);
									}
								});
							}
						});		
					}
				})
			}
			else if(foundTransaction.status == "SELESAI"){
				User.findById(foundTransaction.sellerId, function(err, foundSeller){
					if(err){
						console.log(err);
					}else{
						var sellerSaldo = {currentSaldoCoin: foundSeller.saldo + foundTransaction.bill}
						MemberMasterCoinCard.findOneAndUpdate({'userId': req.user._id}, sellerSaldo,
						{new: true}, function(err, foundSellerCard){
							if(err){
								console.log(err);
							}else{
								var newSellerSaldo = {saldo: foundSellerCard.currentSaldoCoin}
								User.findByIdAndUpdate(foundSeller._id, newSellerSaldo, function(err, foundUser){
									if(err){
										console.log(err);
									}else{
										res.redirect("/"+ req.user.username +"/invoice/" + foundTransaction._id);
									}
								});
							}
						});	
					}
				});
			}else{
				res.redirect("/"+ req.user.username +"/invoice/" + foundTransaction._id);
			}
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
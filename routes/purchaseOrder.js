var express = require("express");
var router = express.Router();
var User = require("../models/user_db/user");
var Product = require("../models/user_db/product");
var Cart = require("../models/user_db/cart");
var Order = require("../models/user_db/order");
var Transaction = require("../models/user_db/transaction");
var MemberMasterCoinCard = require("../models/fintech_db/memberMasterCoinCard");

router.post("/:un/invoice/:id", isLoggedIn, function(req, res){	//Purchase Order
	Order.findById(req.params.id, function(err, foundOrder){
		if(err){
			console.log(err);
		}else{
			Cart.findByIdAndRemove(foundOrder.cartId, function(err){	//Delete the cart
				if(err){
					console.log(err);
				}else{
					Product.findById(foundOrder.productId, function(err, foundProduct){
						if(err){
							console.log(err);
						}else{
							var newTransaction = {
								userId			: req.user._id,
								sellerId		: foundProduct.userId,
								productId		: foundOrder.productId,
								cartId			: foundOrder.cartId,
								orderId			: foundOrder._id,
								bill			: foundOrder.itemQuantity * foundProduct.price,
								paymentMethod	: req.body.paymentMethod,
								status			: "DIBAYAR"
							}
							MemberMasterCoinCard.findOne({'userId': req.user._id}, function(err, foundCard){
								if(err){
									console.log(err);
								}else{
									if(foundCard.currentSaldoCoin < newTransaction.bill){
										res.redirect("/"+req.user.username+"/topup");
									}else{
										var newSaldoCoin = {currentSaldoCoin: foundCard.currentSaldoCoin - newTransaction.bill}
										MemberMasterCoinCard.findByIdAndUpdate(foundCard._id, newSaldoCoin, {new: true}, function(err, foundOne){
											if(err){
												console.log(err);
											}else{
												Transaction.create(newTransaction, function(err, newlyCreated){
													if(err){
														console.log(err);
													}else{
														var newSaldo = {saldo: foundOne.currentSaldoCoin}
														User.findByIdAndUpdate(req.user._id, newSaldo, function(err, foundUser){
															if(err){
																console.log(err);
															}else{
																var id = newlyCreated._id;
																var un = req.user.username;
																res.redirect("/"+un+"/invoice/"+id);
															}
														});
													}
												});
											}
										});
									}
								}
							});
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
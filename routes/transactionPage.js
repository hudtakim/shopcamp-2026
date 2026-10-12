var express = require("express");
var router = express.Router();
var User = require("../models/user_db/user");
var Product = require("../models/user_db/product");
var Order = require("../models/user_db/order");
var Transaction = require("../models/user_db/transaction");

router.get("/:un/invoice/:id", isLoggedIn, function(req, res){		//Show Detail Transaksi + Konfirmasi Terima Barang
	Transaction.findById(req.params.id, function(err, foundTransaction){
		if(err){
			console.log(err);
		}else{
			Order.findById(foundTransaction.orderId, function(err, foundOrder){
				if(err){
					console.log(err);
				}else{
					Product.findById(foundOrder.productId, function(err, foundProduct){
						if(err){
							console.log(err);
						}else{
							User.findById(foundTransaction.userId, function(err, foundBuyer){
								if(err){
									console.log(err);
								}else{
									User.findById(foundTransaction.sellerId, function(err, foundSeller){
										if(err){
											console.log(err);
										}else{
											res.render("user/transaction.ejs", {
												transaction	: foundTransaction, 
												order		: foundOrder, 
												product		: foundProduct, 
												buyer		: foundBuyer,
												seller		: foundSeller
											});		
										}
									});
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
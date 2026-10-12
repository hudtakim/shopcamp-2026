var express = require("express");
var router = express.Router();
var User = require("../models/user_db/user");
var FintechMembership = require("../models/fintech_db/fintechMember");
var MemberMasterCoinCard = require("../models/fintech_db/memberMasterCoinCard");

var passport 				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose")

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());	//coding
passport.deserializeUser(User.deserializeUser()); //decoding

router.post("/signup", function(req, res){	//Register New User
	var fullName = req.body.fullName,
		email 	 = req.body.email,
		password = req.body.password,
		username = req.body.username,
		phone 	 = req.body.phone,
		address  = req.body.address,
		saldo    = 0
	
	User.register(new User({fullName: fullName, email: email,username: username, phone: phone, address: address, saldo: saldo}), password, function(err, newUser){
		if(err){
			console.log(err);
			return res.render("user/signup.ejs");
		}
		var newMember = {
			userId		: newUser._id,
			fullName: newUser.fullName,
			email	: newUser.email,
			username: newUser.username,
			phone	: newUser.phone,
			address	: newUser.address,
		}
		FintechMembership.create(newMember, function(err, newMember){
			if(err){
				console.log(err);
			}else{
				var newMasterCard = {
					userId: newMember.userId,
					currentSaldoCoin: 0
				}
				MemberMasterCoinCard.create(newMasterCard, function(err, newMasterCard){
					if(err){
						console.log(err)
					}else{
						var saldo = { saldo: newMasterCard.currentSaldoCoin} 
						User.findByIdAndUpdate(newUser._id, saldo, function(err, foundOne){  
							if(err){
								console.log(err);
							}else{
								passport.authenticate("local")(req, res, function(){
								res.redirect("/products");
								});
							}
						});
					}
				});
			}
		});
	});
});

module.exports = router;
var express = require("express");
var router = express.Router();
var User = require("../models/user_db/user");

var passport 				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose")

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());	//coding
passport.deserializeUser(User.deserializeUser()); //decoding

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/products");
});

module.exports = router;
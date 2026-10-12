var express = require("express");
var router = express.Router();
var User = require("../models/user_db/user");

var passport 				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose")

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());	//coding
passport.deserializeUser(User.deserializeUser()); //decoding

router.post("/login", passport.authenticate("local", {
	successRedirect: "/products",
	failureRedirect: "/login"
}), function(req, res){
	console.log(req.user);
});

module.exports = router;
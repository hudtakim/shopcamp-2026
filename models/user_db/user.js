var database = require("../database");
var mongoose = database.mongoose;
var userDb = database.userDb;

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	fullName: String,
	email	: String,
	password: String,
	username: String,
	phone	: String,
	address	: String,
	joinDate: { type: Date, default: Date.now },
	saldo	: Number
});

userSchema.plugin(passportLocalMongoose); //take aur local package, add all methods here for authentication

module.exports = userDb.model("User", userSchema);
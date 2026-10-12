var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/user_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

var passportLocalMongoose = require("passport-local-mongoose");

userSchema = new mongoose.Schema({
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

module.exports = mongoose.model("User", userSchema);
var database = require("../database");
var mongoose = database.mongoose;
var fintechDb = database.fintechDb;

var fintechMemberSchema = new mongoose.Schema({
	userId	:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
	fullName: String,
	email	: String,
	username: String,
	phone	: String,
	address	: String,
	joinDate: { type: Date, default: Date.now }
});

module.exports = fintechDb.model("FintechMembership", fintechMemberSchema);
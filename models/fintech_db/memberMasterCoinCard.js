var database = require("../database");
var mongoose = database.mongoose;
var fintechDb = database.fintechDb;

var memberMasterCoinCardSchema = new mongoose.Schema({
	userId			: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	currentSaldoCoin: Number
});

module.exports = fintechDb.model("MemberMasterCoinCard", memberMasterCoinCardSchema);
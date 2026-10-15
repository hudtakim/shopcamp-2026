var mongoose = require("mongoose");
var fintechDb = require("../database").fintechDb;

memberMasterCoinCardSchema = new mongoose.Schema({
	userId			: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	currentSaldoCoin: Number
});

module.exports = fintechDb.model("MemberMasterCoinCard", memberMasterCoinCardSchema);
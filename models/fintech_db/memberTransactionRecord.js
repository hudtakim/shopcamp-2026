var mongoose = require("mongoose");
var fintechDb = require("../database").fintechDb;

memberTransactionRecordSchema = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	transactionType: String,
	transactionDate: Date,
	nominal: Number,
	currentSaldo: Number	
});

module.exports = fintechDb.model("MemberTransactionRecord", memberTransactionRecordSchema);
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/fintech_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

memberTransactionRecordSchema = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	transactionType: String,
	transactionDate: Date,
	nominal: Number,
	currentSaldo: Number	
});

module.exports = mongoose.model("MemberTransactionRecord", memberTransactionRecordSchema);
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/fintech_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

memberMasterCoinCardSchema = new mongoose.Schema({
	userId			: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
	currentSaldoCoin: Number
});

module.exports = mongoose.model("MemberMasterCoinCard", memberMasterCoinCardSchema);
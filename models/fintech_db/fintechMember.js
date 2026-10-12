var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/fintech_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

fintechMemberSchema = new mongoose.Schema({
	userId	:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
	fullName: String,
	email	: String,
	username: String,
	phone	: String,
	address	: String,
	joinDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FintechMembership", fintechMemberSchema);
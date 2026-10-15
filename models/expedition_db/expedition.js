var mongoose = require("mongoose");
var expeditionDb = require("../database").expeditionDb;

expeditionSchema = new mongoose.Schema({
	name: String,
	officeAddress: String,
	phone: String,
	email: String
});

module.exports = expeditionDb.model("Expedition", expeditionSchema);

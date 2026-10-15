var database = require("../database");
var mongoose = database.mongoose;
var expeditionDb = database.expeditionDb;

var expeditionSchema = new mongoose.Schema({
	name: String,
	officeAddress: String,
	phone: String,
	email: String
});

module.exports = expeditionDb.model("Expedition", expeditionSchema);

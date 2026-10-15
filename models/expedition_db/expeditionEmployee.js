var mongoose = require("mongoose");
var expeditionDb = require("../database").expeditionDb;


var expeditionEmployeeSchema = new mongoose.Schema({

	expedition: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Expedition"
		},
		name: String,
		officeAddress: String,
		phone: String,
		email: String
	},
	fullName: String,
	phone: String
	
});

module.exports = expeditionDb.model("ExpeditionEmployee", expeditionEmployeeSchema);
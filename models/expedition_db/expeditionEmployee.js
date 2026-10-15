var database = require("../database");
var mongoose = database.mongoose;
var expeditionDb = database.expeditionDb;


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
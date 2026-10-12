var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/expedition_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);


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

module.exports = mongoose.model("ExpeditionEmployee", expeditionSchema);
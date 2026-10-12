var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/expedition_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

expeditionSchema = new mongoose.Schema({
	name: String,
	officeAddress: String,
	phone: String,
	email: String
});

module.exports = mongoose.model("Expedition", expeditionSchema);


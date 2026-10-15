var database = require("../database");
var mongoose = database.mongoose;
var userDb = database.userDb;

var  commentSchema = new mongoose.Schema({	//products
	author: String,
	text: String
});

module.exports = userDb.model("Comment", commentSchema);

var mongoose = require("mongoose");
var userDb = require("../database").userDb;

var  commentSchema = new mongoose.Schema({	//products
	author: String,
	text: String
});

module.exports = userDb.model("Comment", commentSchema);

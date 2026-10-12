var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/user_db', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

var  commentSchema = new mongoose.Schema({	//products
	author: String,
	text: String
});

module.exports = mongoose.model("Comment", commentSchema);

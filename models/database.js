var mongoose = require("mongoose");

var uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error("MONGODB_URI must be set to your MongoDB Atlas connection string.");
}

mongoose.set("useFindAndModify", false);

function createDatabase(name) {
	var connection = mongoose.createConnection();
	var connected = new Promise(function(resolve, reject) {
		connection.once("open", resolve);
		connection.once("error", reject);
	});

	connection.on("error", function(error) {
		console.error("MongoDB connection error for " + name + ":", error);
	});
	connection.openUri(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: name
	});

	return { connection: connection, connected: connected };
}

var userDb = createDatabase("user_db");
var fintechDb = createDatabase("fintech_db");
var expeditionDb = createDatabase("expedition_db");

module.exports = {
	userDb: userDb.connection,
	fintechDb: fintechDb.connection,
	expeditionDb: expeditionDb.connection,
	ready: Promise.all([
		userDb.connected,
		fintechDb.connected,
		expeditionDb.connected
	])
};

var express = require("express");
var router = express.Router();

router.get("/", function(req, res){	//Lading page
	res.render("landing.ejs");
});

module.exports = router;
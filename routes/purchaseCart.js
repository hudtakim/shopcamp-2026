var express = require("express");
var router = express.Router();
var Cart = require("../models/user_db/cart");

router.put("/:un/order/:id", isLoggedIn,function(req, res){	//Purchase Selected Cart
	Cart.findByIdAndUpdate(req.params.id, req.body, function(err, selectedCart){  
		if(err){
			console.log(err);
		}else{
			var un = req.user.username;
			var id = selectedCart._id;
			res.redirect("/"+un+"/order/"+id);
		}
	});
});

module.exports = router;

//------------is Login ? middleware ---------------------
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}
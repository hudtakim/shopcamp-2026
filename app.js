require("dotenv").config();

//------------------Framework / Dependencies ---------------------
var express 				= require("express"),
	methodOverride 			= require("method-override"),
	mongoose				= require("mongoose"),
	bodyParser  			= require("body-parser"),
	passport 				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose")
	
//-------------------------------Mongo DB Connection ---------------------


//-------------------------------Modules Import---------------------------
var landingPage 		= require("./routes/landing"),
	indexPage			= require("./routes/index"),
	searchProduct 		= require("./routes/search"),
	searchProductResult = require("./routes/searchResult"),
	addNewProductPage	= require("./routes/addNewProductPage"),
	addNewProduct 		= require("./routes/addNewProduct"),
	editProductPage		= require("./routes/editProductPage"),
	updateProduct		= require("./routes/updateProduct"),
	deleteProduct		= require("./routes/deleteProduct"),
	productDetailPage   = require("./routes/productDetailPage"),
	shoppingCartPage	= require("./routes/shoppingCartPage"),
	addToCart			= require("./routes/addToCart"),
	deleteCart			= require("./routes/deleteCart"),
	purchaseCart		= require("./routes/purchaseCart"),
	createOrderPage		= require("./routes/createOrderPage"),
	createOrder			= require("./routes/createOrder"),
	invoicePage			= require("./routes/invoicePage"),
	purchaseOrder		= require("./routes/purchaseOrder"),
	transactionPage		= require("./routes/transactionPage"),
	transactionPhase	= require("./routes/transactionPhase"),
	userDashboard		= require("./routes/userDashboard"),
	userProductList		= require("./routes/userProductList"),
	userProductDetail	= require("./routes/userProductDetail"),
	transactionHistory	= require("./routes/transactionHistory"),
	userRegisterPage	= require("./routes/registerPage"),
	userRegister		= require("./routes/register"),
	userLoginPage		= require("./routes/loginPage"),
	userLogin			= require("./routes/login"),
	userLogout			= require("./routes/logout"),
	userTopUpPage		= require("./routes/topUpPage"),
	userTopUp   		= require("./routes/topUp")

//-------------------------------App Use ----------------------------------

var app = express();
	
app.use(express.static("public")); 					//to connect to public directory
app.use(bodyParser.urlencoded({extended: true})); 	//use body parser
app.use(methodOverride("_method"));   				//use method override
app.use(require("express-session")({				//use session
	secret: process.env.SESSION_SECRET || "local-development-secret-change-before-deploy",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

//-------------------REST FULL ROUTES---------------------------

//-----------------------Seller Routes--------------------------

app.use(userDashboard);			//Show User Dashboard
app.use(userProductList);		//Show User Product list
app.use(userProductDetail);		//Show User Product Detail

app.use(addNewProductPage); 	//Show add New Product Page
app.use(addNewProduct); 		//add New Product
app.use(editProductPage); 		//Show edit Product Page
app.use(updateProduct); 		//Update Product
app.use(deleteProduct); 		//Delete Product	

//------------------Users Main Routes----------------------------

app.use(landingPage);			//show landing page
app.use(indexPage);				//show index page - products list

app.use(searchProduct); 		//search product by user
app.use(searchProductResult); 	//show search product result

app.use(productDetailPage);		//show product detail page

app.use(addToCart);				//add product to cart
app.use(shoppingCartPage);		//Show user's Shopping Cart
app.use(deleteCart);			//delete Cart
app.use(purchaseCart);			//purchase selected cart

app.use(createOrderPage);		//Show Create Order Page
app.use(createOrder);			//Create Order
app.use(invoicePage);			//Show Invoice Page
app.use(purchaseOrder);			//Purchase Order
app.use(transactionPage);		//Show transaction Detail Page
app.use(transactionPhase);		//Update transaction status
app.use(transactionHistory);	//Show transactions History
	
//----------------------Authentication---------------------
app.use(userRegisterPage);		//Show User Register Page
app.use(userRegister);			//user Register

app.use(userLoginPage);			//Show User Login Page
app.use(userLogin);				//user Login
app.use(userLogout);			//user Logout		
app.use(userTopUpPage);			//user top up saldo coin
app.use(userTopUp);				//user saldo topup

app.get("*", function(req, res){		//Show Page not found
	res.render("notfound.ejs");
});

var database = require("./models/database");
var port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
	throw new Error("SESSION_SECRET must be set in production.");
}

database.ready.then(function() {
	app.listen(port, function(){
		console.log("Server is listening on port " + port);
	});
}).catch(function(error) {
	console.error("Failed to connect to MongoDB:", error.name || "MongoDBError", error.code || "");
	process.exit(1);
});
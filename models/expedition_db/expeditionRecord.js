var mongoose = require("mongoose");
var expeditionDb = require("../database").expeditionDb;

var expeditionSchema = new mongoose.Schema({
	expedition: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Expedition"
		}
	},
	transaction: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Transaction"
		},
		order: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Order"
			},
			cart: {
				id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Cart"
				},
				product:{
					id: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "Product"
					},
					name: String,
					image: String,
					price: Number,
					sellerId:String,
					sellerName:String
				},
				quantity:Number
			},
			receiver: {
				fullName: String,
				phone: String,
				address: String,
				postCode: String,
				message: String,
				kurir: String
			}
		},
		author: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			username: String
		},
		seller: String,
		bill: Number,
		paymentMethod: String,
		status: String
	},
	expeditionEmployeeId: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "ExpeditionEmployee"
		}
	}
});

module.exports = expeditionDb.model("ExpeditionRecord", expeditionSchema);
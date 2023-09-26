const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const guestSchema = new Schema({
	name: {
		type: String,
		trim: true,		
		required: true,
	},
	phoneNumber: {
		type: String,
		trim: true,		
		required: false,
	},
	email: {
		type: String,
		trim: true,		
		required: true,
	},
	where: {
		type: String,
		trim: true,		
		required: false,
	},
	specify: {
		type: String,
		trim: true,		
		required: false,
	},
},
{
	timestamps: true,
}
);

module.exports = mongoose.model('guest', guestSchema)
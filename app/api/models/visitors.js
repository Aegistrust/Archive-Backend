const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
	firstName: {
		type: String,
		trim: true,		
		required: true,
	},
	lastName: {
		type: String,
		trim: true,		
		required: true,
	},
	idNumber: {
		type: Number,
		trim: true,		
		required: true,
	},
	phoneNumber: {
		type: String,
		trim: true,		
		required: true,
	},
	email: {
		type: String,
		trim: true,		
		required: false,
	},
	reason: {
		type: String,
		trim: true,		
		required: true,
	},
	entryTime: {
		type: Date,
		trim: true,		
		required: true,
		default: Date.now,
	},
	exitTime: {
		type: Date,
		trim: true,
		required: false
	},
	plateNumber: {
		type: String,
		trim: true,		
		required: true,
	},
	numberOfGuests: {
		type: Number,
		trim: true,		
		required: false,
	},
	company: {
		type: String,
		trim: true,		
		required: false,
	}
},
{
	timestamps: true,
}
);

module.exports = mongoose.model('visitor', visitorSchema)
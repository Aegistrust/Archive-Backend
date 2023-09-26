const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const imageScheme = new Schema({
	id: {
		type: String,
		trim: true,		
	},
	provenance: {
		type: String,
		trim: true,		
	},
	title: {
		type: String,
		trim: true,		
	},
	date: {
		type: String,
		trim: true,		
	},
	type: {
		type: String,
		trim: true,		
	},
	topic: {
		type: String,
		trim: true,		
	},
	description: {
		type: String,
		trim: true,		
	},
	photos: {
		type: String,
		trim: true,		
	},	
	quality: {
		type: String,
		trim: true,		
	},
	format: {
		type: String,
		trim: true,		
	},
	glifos: {
		type: String,
		trim: true,		
	},
	postedOnline: {
		type: String,
		trim: true,		
	},  
	cordinated: {
		type: String,
		trim: true,		
	},  
	photographer: {
		type: String,
		trim: true,		
	},    
	copyRight: {
		type: String,
		trim: true,		
	},
	repository: {
		type: String,
		trim: true,		
	},
	note: {
		type: String,
		trim: true,		
	},
},
{
	timestamps: true,
}
);

module.exports = mongoose.model('images', imageScheme)
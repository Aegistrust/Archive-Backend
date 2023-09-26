const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const docScheme = new Schema({
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
	author: {
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
	pages: {
		type: String,
		trim: true,		
	},
	language: {
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

module.exports = mongoose.model('documents', docScheme)
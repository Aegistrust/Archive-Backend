const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const victimScheme = new Schema({
	id: {
		type: String,
		trim: true,		
	},
	provenance: {
		type: String,
		trim: true,		
	},
	victim: {
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
	VictimDescription: {
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
	doWeNeed: {
		type: String,
		trim: true,		
	},
	submittedBy: {
		type: String,
		trim: true,		
	},
	restriction: {
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

module.exports = mongoose.model('victimImages', victimScheme)
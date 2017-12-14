var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	image:{
		type: String,
	},
	title:{
		type: String,
	},
	resumen: {
		type: String,
	},
	idUser: {
		type: String,
	},
	fecha: {
		type: Date,
		default: Date.now,
	}
}, {collection: 'post'});

module.exports = mongoose.model('post', postSchema);

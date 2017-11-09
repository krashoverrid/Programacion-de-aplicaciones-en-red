var mongoose = require('mongoose');

var facultad = mongoose.model('facultad',{
	facultad:{
		type: String
	},
	profesores:{
		type: String
	},
	alumnos:{
		type: String,
	}
});

module.exports = {facultad};
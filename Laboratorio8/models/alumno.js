var mongoose = require('mongoose');

var alumno = mongoose.model('alumno',{
	nombre: {
		type: String
	},
	apellido: {
		type: String
	},
	codigo: {
		type: String
	},
	trica: {
		type: String
	},
	cicle: {
		type: String
	}
});

module.exports = {alumno};
var mongoose = require('mongoose');

var profesor = mongoose.model('profesor',{
	nombre: {
		type: String
	},
	apellido: {
		type: String
	},
	codigo: {
		type: String
	},
	cursosDictados: {
		type: String
	}
});

module.exports = {profesor};
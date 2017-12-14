var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id:{
		type: String,
		require: true,
		trim: true,
		minlength: 1,
		unique: true,
	},
	password:{
		type: String,
		require: true,
	}
}, {collection: 'users'});

userSchema.methods.generateHash = (password) =>{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = (password) => {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
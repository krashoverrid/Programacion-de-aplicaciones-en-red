'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	fullName:{
		type: String,
		trim: true,
		require: true
	},
	email:{
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		require: true
	},
	hash_password: {
		type: String,
		require: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

userSchema.methods.comparePassword = (password)=>{
	console.log('dd: ' + password);
	return bcrypt.compareSync(password, this.hash_password);
};


mongoose.model('User', userSchema);
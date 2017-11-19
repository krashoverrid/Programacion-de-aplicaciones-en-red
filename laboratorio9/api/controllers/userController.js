'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

exports.register = (req, res)=>{
	var newUser = new User(req.body);
	console.log('ss1: ' + req.body);
	newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
	console.log('ss: ' + newUser);
	newUser.save( (err, user)=>{
		if(err){
			return res.status(400).send({
				message: err
			});
		} else{
			user.hash_password = undefined;
			return res.json(user);
		}
	});
};

exports.sign_in = (req, res)=>{
	User.findOne({
		email: req.body.email
	}, (err, user)=>{
		if (err) throw err;
		console.log('gg: ' + user);
		if(!user){
			res.status(401).json({message: 'Authentication failed. User not found.'});
		}
		else {
			console.log('hashdb: '+ user.hash_password);
			console.log('hashgenerate: '+ bcrypt.hashSync(req.body.password, 10));
			console.log('sss: '+ bcrypt.compareSync(req.body.password, user.hash_password));
			//if(user.hash_password == bcrypt.hashSync(req.body.password, 10)){
			if(!bcrypt.compareSync(req.body.password, user.hash_password)){
				console.log('ddd: '+ req.body.password);
				res.status(401).json({message: 'Authentication failed. Wrong password'});
			}
			else{
				return res.json({token: jwt.sign({email: user.email, fullName: user.fullName,_id: user._id}, 'RestFulApis')});
			}
		}
	});
};

exports.loginRequired = (req, res, next)=>{
	if(req.user){
		next();
	}else{
		//return res.status(401).json({message: 'Unauthorized user!'});
		next();
	}
};
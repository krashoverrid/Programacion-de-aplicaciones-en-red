var express = require('express');
var router = express.Router();
var user = require('../models/users');
var pst = require('../models/posts');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var multer = require('multer');

var storage = multer.diskStorage({
	destination:(req, file, cb)=>{
		cb(null, 'public/images');
	},
	filename:(req, file, cb)=>{
		cb(null, Date() +'-'+ file.originalname);
	}
});

var upload = multer({ storage });

/* GET home page. */
/* Busca todos los post */
router.get('/', function(req, res, next) {
  	console.log('GET /');
	//console.log(req.session);
  	if(req.session.user != null){
  		/*pst.find({idUser: req.session.user },(err, item)=>{
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  		req.session.errors = null;
	  		res.render('index', {psts: item, login: req.session.user, success: req.session.success, errors: req.session.errors});
	  	});*/
	  	res.redirect('/admin');
  	}
  	else{
  		pst.find({},(err, item)=>{
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  		res.render('index', {psts: item, login: '', success: req.session.success, errors: req.session.errors});
	  	});
  	}
  	req.session.errors = null;
});

/* redirecciona a admin */
router.get('/login', function(req, res, next) {
	console.log('GET /login');
  	res.render('login', {errors: req.session.errors});
  	req.session.errors = null;
});

router.post('/admin',function(req, res){
		console.log('POST LOGIN ' + req.body.name);
		if(req.body.name.length > 0){
			user.findOne({id: req.body.name}, (err, item)=>{
				if(item == null){
					req.session.errors = JSON.parse('[{ "msg" : "Missing User"}]');
					res.redirect('/login');
				}
				if(item){
					if(bcrypt.compareSync(req.body.password, item.password)){
						pst.find({idUser: item.id}, (error, pstf)=>{
							if(error){
					  			req.session.errors = JSON.parse('[{ "msg" : `error`}]');
					  			res.redirect('/login');
					  		}
					  		req.session.user = req.body.name;
					  		req.session.success = true;
					  		res.render('index', {psts: pstf, login: item.id});
						});
					}
					else{
						req.session.errors = JSON.parse('[{ "msg" : "Incorrect password"}]');
					  	res.redirect('/login');
					}
				}
			});	
		}
		else{
			req.session.errors = JSON.parse('[{ "msg" : "Invalid User"}]');
			res.redirect('/login');
		}
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next){
	var newUser = new user(req.body);
	newUser.password = bcrypt.hashSync(req.body.password, 10);
	newUser.save( (err, user)=>{
		if(err){
			return res.status(400).send({
				message: err
			});
		} else{
			user.password = bcrypt.hashSync(req.body.password, 10);
			user.token = req.body.password;
			req.session.user = req.body.id;
			req.session.success = true;
			return res.render('index', { psts: '', login: req.session.user, success: req.session.success, errors: req.session.errors});
		}
	});

});


router.get('/admin', function(req, res, next) {
	if(req.session.success){
		//res.render('index', { title: 'Express' });
		pst.find({idUser: req.session.user },(err, item)=>{
	  		if(err){
	  			res.status(500).send(err);
	  			return;
	  		}
	  		req.session.errors = null;
	  		res.render('index', {psts: item, login: req.session.user, success: req.session.success, errors: req.session.errors});
	  	});
	}
	else{
		req.session.success = null;
		req.session.user = null;
		res.redirect('/');
	}
  
});

router.get('/postear',function(req,res, next){
	if(req.session.success){
		console.log('GET /postear ' + req.session.user);
		console.log(req.session);
		res.render('postear', {login: req.session.user, date: Date.now(), success: req.session.success, errors: req.session.errors});
	}
	else{
		req.session.success = null;
		res.redirect('/');
	}
		
});

router.post('/postear',upload.single('image'),function(req, res, next){
	console.log('POST /postear ' + req.session.user);
	if(req.session.success){
		console.log(req.body);
		var newpst = new pst(req.body);
		newpst.image = 'images/' + req.file.filename;
		newpst.save((err, wpst)=>{
			if(err){
				return res.status(400).send({
					message: err
				});
			}
			res.redirect('/admin');
		});
	}
	else{
		req.session.success = null;
		res.redirect('/');
	}
})

router.get('/logout', function(req, res, next){
	req.session.destroy(function(err) {
	  // cannot access session here
	  return;
	});
	res.redirect('/');
});

module.exports = router;

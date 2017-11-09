var express = require('express');
var Item = require('../models/item');
const _ = require("lodash");
var Type = require('type-of-is');

var router = express.Router();

/* GET home page. */
router.get('/items', (req, res)=>{
  	console.log('GET /items/');

  	//var itemID = req.params.itemID;
  	Item.find({}, (err, item)=>{
	    if(err){
	      	res.status(500).send(err);
	      	return;
	    }
	    console.log(item);
	    //res.send(item);
	    res.render('general.pug',{data: item});
  	})
});

router.get('/items/:id', (req, res)=>{
  	console.log('GET /items/'+req.params.id);

  	var itemID = req.params.id;
  	Item.findOne({facultad: itemID}, (err, item)=>{
	    if(err){
	      	res.status(500).send(err);
	      	return;
	    }
	    //console.log(item);

	    alumnos7mo = JSON.stringify(item);
	    alumnos7mo = JSON.parse(alumnos7mo);
	    var alumnos7 = alumnos7mo.alumnos.filter(function(index) {
	    	return index.ciclo == 7;
	    });
	    console.log(alumnos7);
	    /*var alumnosFisica = alumnos7.filter((alumno)=>{
	    	console.log(alumno.cursos);
		    return alumno.cursos;
		});*/
	    console.log("ff" + alumnosFisica);
	    console.log(Type(alumnos7mo));
	    //res.send(item);
	    res.render('index.pug',{data: item});
  	})
});


module.exports = router;

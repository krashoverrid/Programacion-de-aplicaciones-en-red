var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

let usr = '';
let passw = '';

router.post('/recuperardatos', function(req, res, next) {
  usr = req.body.usuario || '';
  passw = req.body.pass || '';
  console.log(usr);
  res.redirect('/index');
});

router.get('/index', function(req, res, next) {
  res.render('index', { usuario: " "+usr });
});
module.exports = router;

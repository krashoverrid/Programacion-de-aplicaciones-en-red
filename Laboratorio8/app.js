var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


var mongoose = require('./db/mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/*var reader = JSON.stringify('{ }');
/* Asign Data and divide 
request({
	url: `https://mighty-harbor-50073.herokuapp.com/api`,
	json: true
},(error, response, body) => {
	if(error){
		console.log('Unable to connet to servers');
	}
	else{
		reader = body[0].facultades[0];
		//console.log(reader);

		/*cmongo.insertFacultad('facultads', 'FC', reader.FC[0]);
		cmongo.insertFacultad('facultads', 'FIC', reader.FIC[0]);
		cmongo.insertFacultad('facultads', 'FAUA', reader.FAUA[0]);
	}
});*/

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

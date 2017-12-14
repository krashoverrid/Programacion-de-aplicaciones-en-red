var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/test', {
mongoose.connect('mongodb://heroku_x8f81h13:misterio169@ds141786.mlab.com:41786/heroku_x8f81h13', {
  useMongoClient: true,
});

console.log('conectado a test');

module.exports={
	mongoose
};
var mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', {
  useMongoClient: true,
});

console.log('conectado a test');

module.exports={
	mongoose
};
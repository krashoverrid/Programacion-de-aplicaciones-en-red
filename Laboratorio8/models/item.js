var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  facultad: {
    type: String,
    required: true
  },
  profesores: {
    type: Array,
    required: true
  },
  alumnos: {
    type: Array,
    required: true,
    default: 1
  }
}, { collection: 'facultades' });

module.exports = mongoose.model('Item', itemSchema);

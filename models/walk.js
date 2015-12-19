var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Walk = new Schema({
  description: String
});

module.exports = mongoose.model('Walk', Walk);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var walkSchema = new Schema({
  description: String
});

mongoose.model('walk', walkSchema);

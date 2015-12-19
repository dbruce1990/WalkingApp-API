var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Walk = new Schema({
  id: Schema.ObjectId,
  description: String,
  createdAt: Number,
  elapsedTime: Number,
  distance: Number,
  waypoints: Array
});

module.exports = mongoose.model('Walk', Walk);

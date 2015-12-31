var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Walk = new Schema({
  id: Schema.ObjectId,
  created_at: Date,
  updated_at: Date,
  description: String,
  elapsedTime: Number,
  distance: Number,
  waypoints: Array
});

Walk.pre('save', function(next){
  var now = new Date();

  this.updatedAt = now;

  if(!this.created_at)
    this.created_at = now;

  next();
});

module.exports = mongoose.model('Walk', Walk);

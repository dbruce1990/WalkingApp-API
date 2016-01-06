var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LatLng = new Schema({
  id: Schema.ObjectId,
  created_at: Date,
  accuracy: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});
LatLng.pre('save', function(next){
  if(!this.created_at)
    this.created_at = new Date();
  next();
});

var Walk = new Schema({
  id: Schema.ObjectId,
  created_at: Date,
  updated_at: Date,
  description: String,
  elapsedTime: Number,
  distance: Number,
  waypoints: [LatLng],
  _user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

Walk.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if(!this.created_at)
    this.created_at = now;
  next();
});

Walk.pre('update', function(next){
  this.updated_at = new Date();
});

Walk.pre('findOneAndUpdate', function(next){
  this.updated_at = new Date();
});

Walk.pre('findByIdAndUpdate', function(next){
  this.updated_at = new Date();
});

module.exports = mongoose.model('Walk', Walk);

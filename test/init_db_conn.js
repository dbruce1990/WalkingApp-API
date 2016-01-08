/*
  Must be included before app.js
*/
var db = require('../config/database').test;
var mongoose = require('mongoose');

//ensure NODE_ENV set to 'test'
process.env.NODE_ENV = 'test';

beforeEach(function(done){
  var clearDB = function(){
    for(var i in mongoose.connection.collections){
      mongoose.connection.collections[i].remove();
    }
    done();
  };

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(db, function (err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach(function(done){
  for(var i in mongoose.connection.collections){
    mongoose.connection.collections[i].remove();
  }
  mongoose.disconnect();
  return done();
});

// var mongoose = require('mongoose');
// var Walk = require('../../models/walk');
// var expect = require('chai').expect;
//
// describe('Walk Controller', function(){
//   before(function(){
//     //create and connect to temporary mongodb database
//     mongoose.connect('mongodb://localhost/WalkingApp-Test');
//
//     //create temporary model
//     walk = new Walk();
//     walk.description = 'this is a short description';
//     walk.elapsedTime = 10000;
//     walk.distance = 5000;
//     walk.waypoints = {};
//     this.walk = walk;
//   });
//
//   it('should save a model', function(done){
//     this.walk.save(function(err, walk){
//       if(err) done(err);
//       done();
//     });
//   });
//
// });

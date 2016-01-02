require('../database_connection');
var expect = require('chai').expect;
var app = require('../../app');
var agent = require('supertest').agent(app);
var mongoose = require('mongoose');
var Walk = require('../../models/walk');
var User = require('../../models/user');
var mocha = this;

describe('Walks Routes Authorized', function(){
  it('should return all walks related to user', function(done){
    agent.post('/login')
      .send({username: 'bob', password: 'password123'})
      .end(function(err, res){
        if(err) done(err);
        agent.get('/walks').expect(200).end(done);
      });
  });

  beforeEach(function(done){
    //TODO Need to find out how to test this without creating a user and logging in first...
    //first need to create and login a user in, and create some walks

    //create temporary models
    var walk1 = new Walk();
    walk1.description = 'description1';
    walk1.elapsedTime = 10000;
    walk1.distance = 5000;
    walk1.waypoints = {};
    mocha.walk1 = walk1;

    var walk2 = new Walk();
    walk1.description = 'description1';
    walk1.elapsedTime = 10000;
    walk1.distance = 5000;
    walk1.waypoints = {};
    mocha.walk2 = walk2;

    var walk3 = new Walk();
    walk1.description = 'description1';
    walk1.elapsedTime = 10000;
    walk1.distance = 5000;
    walk1.waypoints = {};
    mocha.walk3 = walk3;

    mocha.walk1.save(function(err, walk){ if(err) done(err); });
    mocha.walk2.save(function(err, walk){ if(err) done(err); });
    mocha.walk3.save(function(err, walk){ if(err) done(err); });

    //create temporary user
    var userData = { username: 'bob', password: 'password123' };
    var user = new User(userData)
    .save(function(err, user){
      if(err) done(err);
      mocha.user = user;
      agent.post('/login').send(userData).end(function(err, res){
        if(err) done(err);
        console.log(res.body);
        done();
      });
    });
  })
});

// /* Unauthorized Requests */
describe('Walks Routes Unauthorized', function(){

  it('should return 401', function(done){
    agent.get('/walks').expect(401, done);
  });

  it('should return 401', function(done){
    agent .get('/walks/10987654321') .expect(401, done);
  });

  it('should return 401', function(done){
    var data = {
      description: "a short description" ,
      elapsedTime: 123456789,
      distance: 100000000
    };

    agent
    .post('/walks')
    .send(data)
    .expect(401, done);
  });

  it('should return 401', function(done){
    var data = {
      _id: 10987654321,
      description: "a short description" ,
      elapsedTime: 123456789,
      distance: 100000000
    };
    agent
    .put('/walks')
    .send(data)
    .expect(401, done);
  });

  it('should return 401', function(done){
    agent .delete('/walks/10987654321') .expect(401, done);
  });
});

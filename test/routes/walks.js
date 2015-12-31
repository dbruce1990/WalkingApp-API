require('../database_connection');
var app = require('../../app');
var agent = require('supertest').agent(app);
var mongoose = require('mongoose');
var Walk = require('../../models/walk');
var User = require('../../models/user');
var request = require('request');
describe('Walks Routes Authorized', function(){
  before(function(done){
    //first need to create and login a user in, and create some walks

    //create temporary models
    var walk1 = new Walk();
    walk1.description = 'description1';
    walk1.elapsedTime = 10000;
    walk1.distance = 5000;
    walk1.waypoints = {};
    this.walk = walk1;

    var walk2 = new Walk();
    walk1.description = 'description1';
    walk1.elapsedTime = 10000;
    walk1.distance = 5000;
    walk1.waypoints = {};
    this.walk = walk1;

    var walk3 = new Walk();
    walk1.description = 'description1';
    walk1.elapsedTime = 10000;
    walk1.distance = 5000;
    walk1.waypoints = {};
    this.walk = walk1;

    //TODO Need to find out how to test this without creating a user and logging in first...
    //create temporary user
    var mocha = this;
    var userData = { username: 'bob', password: 'password123' };
    var user = new User(userData)
      .save(function(err, user){
        if(err) {
          console.log(err);
          done(err);
        }
        mocha.user = user;
        // login temporary user
        var options = {
          url: 'http://localhost:3000/login',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          json: userData
        };
        request(options, function(err, res, body){
          console.log(body);
          done();
        });
        // agent.post('/login').send(userData, done);
      });
  });

  // it('should return a list of walks');
});

/* Unauthorized Requests */
describe('Walks Routes Unauthorized', function(){

  it('should return 401', function(done){
    agent
    .get('/walks')
    .expect(401, done);
  });

  it('should return 401', function(done){
    agent
    .get('/walks/10987654321')
    .expect(401, done);
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
    agent
    .delete('/walks/10987654321')
    .expect(401, done);
  });
});

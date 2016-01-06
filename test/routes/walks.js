require('../init_db_conn');
var expect = require('chai').expect;
var app = require('../../app');
var req = require('supertest').agent(app);
var mongoose = require('mongoose');
var Walk = require('../../models/walk');
var User = require('../../models/user');

var userData = {
  username: 'bob',
  password: 'password123'
};

describe('Walks', function(){
  describe('Routes', function(){
    describe('Authenticated', function(){
      describe('Success', function(){
        beforeEach(function(done){
          //TODO Need to find out how to test this without creating a user and logging in first...
          //first need to create and login a user in, and create some walks

          var _this = this;
          //create temporary user
          var userData = { username: 'bob', password: 'password123' };
          var user = new User(userData)
          .save(function(err, user){
            if(err) done(err);

            _this.user = user;

            req.post('/login')
            .send(userData)
            .end(function(err, res){
              if(err) done(err);
              //create temporary models
              var walk1 = new Walk();
              walk1.description = 'description1';
              walk1.elapsedTime = 10000;
              walk1.distance = 5000;
              walk1.waypoints = {};
              walk1._user = res.body.user._id;

              var walk2 = new Walk();
              walk2.description = 'description1';
              walk2.elapsedTime = 10000;
              walk2.distance = 5000;
              walk2.waypoints = {};
              walk2._user = res.body.user._id;


              var walk3 = new Walk();
              walk3.description = 'description1';
              walk3.elapsedTime = 10000;
              walk3.distance = 5000;
              walk3.waypoints = {};
              walk3._user = res.body.user._id;


              walk1.save(function(err, walk){
                if(err) return done(err);
                _this.walk1 = walk1;

                walk2.save(function(err, walk){
                  if(err) return done(err);
                  _this.walk2 = walk2;

                  walk3.save(function(err, walk){
                    if(err) return done(err);
                    _this.walk3 = walk3;
                    done();
                  });
                });
              });
            });
          });
        });

        it('should return all walks related to user', function(done){
          req.post('/login')
          .send(userData)
          .then(function(res){
            req.get('/walks')
            .expect(200)
            .end(function(err, res){
              if(err) return done(err);
              res.body.walks.should.have.length(3);
              done();
            });
          });
        });

        it('should return a single walk by id', function(done){
          var _this = this;
          req.post('/login')
          .send(userData)
          .then(function(res){
            req.get('/walks/' + _this.walk1._id)
            .expect(200)
            .end(function(err, res){
              if(err) return done(err);
              res.body.walk._id.should.equal(_this.walk1._id.toString());
              res.body.walk._user.should.equal(_this.user._id.toString());
              done();
            });
          });
        });

        it.only('should create a new Walk', function(done){
          var _this = this;
          var walk = {
            description: "this is a description",
            elapsedTime: 100000,
            distance: 5000,
            waypoints:
              [{"accuracy":11,
                "latlng":{"latitude":44.06523257,
                "longitude":-123.06101363}
              }

          };

          _this.query = { description: walk.description};
          _this.walk = walk;

          req.post('/login')
          .send(userData)
          .then(function(res){
            req.post('/walks')
            .send(_this.walk)
            .expect(200)
            .end(function(err, res){
              if(err) return done(err);
              res.body.success.should.equal(true);
              Walk.findOne(_this.query, function(err, walk){
                if(err) return done(err);
                walk.should.not.be.null();
                walk.description.should.match(_this.walk.description);
                walk.elapsedTime.should.equal(_this.walk.elapsedTime);
                walk.distance.should.equal(_this.walk.distance);
                walk.waypoints.should.be.type('object');
                done();
              });
            });
          });
        });

      });

      describe('Error', function(){

      });

    });

    describe('Unauthorized', function(){
      it('should return 401', function(done){
        req.get('/walks')
        .expect(401)
        .end(function(err, res){
          if(err) return done(err);
          res.text.should.match(/You must login first./);
          done();
        });
      });

      it('should return 401', function(done){
        req.get('/walks/10987654321')
        .expect(401)
        .end(function(err, res){
          if(err) return done(err);
          res.text.should.match(/You must login first./);
          done();
        });
      });

      it('should return 401', function(done){
        var data = {
          description: "a short description" ,
          elapsedTime: 123456789,
          distance: 100000000
        };

        req.post('/walks')
        .send(data)
        .expect(401)
        .end(function(err, res){
          if(err) return done(err);
          res.text.should.match(/You must login first./);
          done();
        });
      });

      it('should return 401', function(done){
        var data = {
          _id: 10987654321,
          description: "a short description" ,
          elapsedTime: 123456789,
          distance: 100000000
        };
        req.put('/walks')
        .send(data)
        .expect(401)
        .end(function(err, res){
          if(err) return done(err);
          res.text.should.match(/You must login first./);
          done();
        });
      });

      it('should return 401', function(done){
        req.delete('/walks/10987654321')
        .expect(401)
        .end(function(err, res){
          if(err) return done(err);
          res.text.should.match(/You must login first./);
          done();
        });
      });
    });
  });
});

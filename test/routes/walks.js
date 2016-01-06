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

var walk = {
  description: "this is a description",
  elapsedTime: 100000,
  distance: 5000,
  waypoints: [
    {"accuracy":11, "latitude":44.06523257, "longitude":-123.06101363},
    {"accuracy": 12, "latitude": 44.06525829,"longitude": -123.06100709},
    {"accuracy": 21, "latitude":44.06521917, "longitude":-123.06098176}
  ]
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
              var walk1 = new Walk({
                description: 'description1',
                elapsedTime: 10000,
                distance: 5000,
                _user: res.body.user._id,
                waypoints: [
                  {"accuracy":11, "latitude":44.06523257, "longitude":-123.06101363},
                  {"accuracy":12, "latitude":44.06525829, "longitude":-123.06100709},
                  {"accuracy":11, "latitude":44.06523424, "longitude":-123.06099261},
                  {"accuracy":11, "latitude":44.0652201, "longitude":-123.06097669}
                ]
              });

              var walk2 = new Walk({
                description: 'description1',
                elapsedTime: 10000,
                distance: 5000,
                _user: res.body.user._id,
                waypoints: [
                  {"accuracy":11, "latitude":44.06523424, "longitude":-123.06099261},
                  {"accuracy":11, "latitude":44.0652201, "longitude":-123.06097669},
                  {"accuracy":11, "latitude":44.06521917,"longitude":-123.06098176}
                ]
              });

              var walk3 = new Walk({
                description: 'description1',
                elapsedTime: 10000,
                distance: 5000,
                _user: res.body.user._id,
                waypoints: [
                  {"accuracy":6, "latitude":44.06528592, "longitude":-123.06087405},
                  {"accuracy":4, "latitude":44.06528038, "longitude":-123.06088851},
                  {"accuracy":4, "latitude":44.06528185, "longitude":-123.06088036}
                ]
              });

              //save temporary models
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
          .end(function(err, res){
            if(err) return done(err);
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
          .end(function(err, res){
            if(err) return done(err);
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

        it('should create a new walk', function(done){
          var _this = this;
          req.post('/login')
          .send(userData)
          .end(function(err, res){
            if(err) return done(err);
            req.post('/walks')
            .send(walk)
            .expect(200)
            .end(function(err, res){
              if(err) return done(err);
              var query = { _id: res.body.walk._id };
              Walk.findOne(query, function(err, walk){
                if(err) return done(err);
                res.body.success.should.equal(true);
                walk.should.not.be.null();
                walk.description.should.match(walk.description);
                walk.elapsedTime.should.equal(walk.elapsedTime);
                walk.distance.should.equal(walk.distance);
                walk.waypoints.should.be.type('object');
                done();
              });
            });
          });
        });

        it('should update the description of a walk', function(done){
          var _this = this;

          req.post('/login')
            .send(userData)
            .end(function(err, res){
              if(err) return done(err);
              req.get('/walks')
                .end(function(err, res){
                  if(err) return done(err);
                  var walk = res.body.walks[0];
                  var id = walk._id;

                  var newDescription = {description: 'This is a new description.'};
                  req.put('/walks/' + id)
                    .send(newDescription)
                    .expect(200)
                    .end(function(err, res){
                      if(err) return done(err);
                      res.body.success.should.equal(true);
                      res.body.walk.description.should.match(/This is a new description./);
                      done();
                    });
                });
            });
        });

        it('should delete walk from database', function(done){
          req.post('/login')
            .send(userData)
            .end(function(err, res){
              if(err) return done(err);

              req.post('/walks')
                .send(walk)
                .end(function(err, res){
                  if(err) return done(err);

                  req.delete('/walks/' + res.body.walk._id)
                    .expect(200)
                    .end(function(err, res){
                      Walk.findOne({_id: walk._id}, function(err, walk){
                        if(err) return done(err);
                        res.body.success.should.equal(true);
                        expect(walk).to.not.exist;
                        done();
                      });
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

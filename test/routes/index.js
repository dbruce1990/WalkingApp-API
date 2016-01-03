var db = require('../init_db_conn');
var User = require('../../models/user');
var app = require('../../app');
var should = require('should');
var req = require('supertest')(app);
<<<<<<< HEAD


describe('Index', function(){
  describe('Views', function(){
    it('should return index page', function(done){
      req.get('/')
      .expect(200, done);
    });

    it('should fail horribly', function(done){
      req.get('/fail')
      .expect(401, done);
    });

    it('should return login page', function(done){
      req.get('/login')
=======

describe.only('Index Routes', function(){
  it('should return 200', function(done){
      req.get('/')
        .expect(200, done);
  });

  it('should fail horribly', function(done){
    req.get('/fail')
      .expect(401, done);
  });

  it('should return login page', function(done){
    req.get('/login')
>>>>>>> 10d96d986d9cf7a1125481a26db4f679ae2e2461
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        res.text.should.match(/<form name="login" method="post">/);
        res.text.should.match(/name="login"/);
        res.text.should.match(/name="username"/);
        res.text.should.match(/name="password"/);
        res.text.should.match(/name="submit"/);
        done();
      });
<<<<<<< HEAD
    });

    it('should return signup page', function(done){
      req.get('/signup')
=======
  });

  it('should return signup page', function(done){
    req.get('/signup')
>>>>>>> 10d96d986d9cf7a1125481a26db4f679ae2e2461
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        res.text.should.match(/<form name="signup" method="post">/);
        res.text.should.match(/name="username"/);
        res.text.should.match(/name="password"/);
        res.text.should.match(/name="submit"/);
        done();
      });
<<<<<<< HEAD
    });
  });

  describe('Routes', function(){
    describe('Signup', function(){});

    describe('Login', function(){
      beforeEach(function(done){
        var _this = this;
        var data = {
          username: "bob",
          password: "password123"
        };
        var user = new User(data);
        user.save(function(err, user){
          if(err) return done(err);
          _this.user = user;
          done();
        });
      });

      it('should fail to login user due to invalid credentials', function(done){
        req.post('/login')
          .send({
            username: 'bob',
            password: 'wrongPass'
          })
          .expect(401, done);
      });

      it('should login user', function(done){
        req.post('/login')
          .send(_this.data)
          .expect(200)
          .end(function(err, res){
            res.body.user.username.should.equal(_this.user.username);
            res.body.user.password.should.equal(_this.user.password);
            done();
          });
      });
    });

=======
>>>>>>> 10d96d986d9cf7a1125481a26db4f679ae2e2461
  });
});

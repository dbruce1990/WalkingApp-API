var db = require('../init_db_conn');
var User = require('../../models/user');
var app = require('../../app');
var should = require('should');
var req = require('supertest')(app);

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
    });

    it('should return signup page', function(done){
      req.get('/signup')
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        res.text.should.match(/<form name="signup" method="post">/);
        res.text.should.match(/name="username"/);
        res.text.should.match(/name="password"/);
        res.text.should.match(/name="submit"/);
        done();
      });
    });
  });

  describe('Routes', function(){
    describe('Signup', function(){
      beforeEach(function(done){
        this.data = {
          username: 'bob',
          password: 'password123'
        };
        done();
      });

      it('should signup a new user', function(done){
        var _this = this;
        req.post('/signup')
          .send(this.data)
          .expect(200)
          .end(function(err, res){
            if(err) return done(err);
            User.findOne({_id: res.body.user._id}, function(err, user){
              if(err) return done(err);
              user.should.not.be.null();
              user.username.should.equal(_this.data.username);
              done();
            });
          });
      });

      it('should fail to signup a new user', function(done){
        var _this = this;
        var user = new User(_this.data);
        user.save(function(err, user){
          if(err) return done(err);
          req.post('/signup')
            .send(_this.data)
            .expect(500)
            .end(function(err, res){
              if(err) return done(err);
              res.body.success.should.equal(false);
              res.body.message.should.equal('Duplicate found.');
              done();
            });
        });
      });
    });

    describe('Login', function(){
      beforeEach(function(done){
        var _this = this;
        _this.data = {
          username: "bob",
          password: "password123"
        };
        var user = new User(_this.data);
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
        var _this = this;
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

  });
});

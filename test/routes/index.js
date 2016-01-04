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
    describe.only('Signup', function(){

      it('should successfuly signup a new user', function(done){
        var data = {
          username: 'bob',
          password: 'password123'
        };
        req.post('/signup')
          .send(data)
          .expect(200)
          .end(function(err, res){
            if(err) return done(err);
            User.findOne({_id: res.body.user._id}, function(err, user){
              if(err) return done(err);
              user.should.not.be.null();
              user.username.should.equal(data.username);
              done();
            });
          });
      });

      it('should fail due to duplicate credentials', function(done){
        var data = {
          username: 'bob',
          password: 'password123'
        };

        var user = new User(data);

        user.save(function(err, user){
          if(err) return done(err);
          req.post('/signup')
            .send(data)
            .expect(500)
            .end(function(err, res){
              if(err) return done(err);
              res.body.success.should.equal(false);
              res.body.errors.messages.should.containEql('Duplicate found.');
              done();
            });
        });
      });

      it('should fail due to missing username attribute', function(done){
        var data = {
          username: '',
          password: 'password123'
        };
        req.post('/signup')
          .send(data)
          .expect(500)
          .end(function(err, res){
            if(err) return done(err);
            res.body.success.should.equal(false);
            res.body.errors.messages.should.match(/Path `username` is required./);
            res.body.errors.messages.should.not.match(/Path `password` is required./)
            done();
          });
      });

      it('should fail due to missing password attribute', function(done){
        var data = {
          username: 'bob',
          password: ''
        };
        req.post('/signup')
          .send(data)
          .expect(500)
          .end(function(err, res){
            if(err) return done(err);
            res.body.success.should.equal(false);
            res.body.errors.messages.should.match(/Path `password` is required./);
            res.body.errors.messages.should.not.match(/Path `username` is required./);
            done();
          });
      });

      it('should fail due to missing credentials', function(done){
        var data = {
          username: '',
          password: ''
        };
        req.post('/signup')
          .send(data)
          .expect(500)
          .end(function(err, res){
            if(err) return done(err);
              res.body.success.should.equal(false);
              res.body.errors.messages.should.have.length(2);
              res.body.errors.messages.should.containEql('Path `username` is required.');
              res.body.errors.messages.should.containEql('Path `password` is required.');
            done();
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

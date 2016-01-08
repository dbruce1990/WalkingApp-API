var db = require('../init_db_conn');
var User = require('../../models/user');
var app = require('../../app');
var should = require('should');
var req = require('supertest').agent(app);

var userData = {
  username: "bob",
  password: "password123"
};

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

      it('should successfuly signup a new user', function(done){
        req.post('/signup')
          .send(userData)
          .expect(200)
          .end(function(err, res){
            if(err) return done(err);
            User.findOne({_id: res.body.user._id}, function(err, user){
              if(err) return done(err);
              user.should.not.be.null();
              user.username.should.equal(userData.username);
              done();
            });
          });
      });

      describe('Errors', function(){
        it('should fail due to duplicate credentials', function(done){
          var user = new User(userData);

          user.save(function(err, user){
            if(err) return done(err);
            req.post('/signup')
              .send(userData)
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
              res.body.errors.messages.should.containEql('Path `username` is required.');
              res.body.errors.messages.should.not.containEql('Path `password` is required.');
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
              res.body.errors.messages.should.containEql('Path `password` is required.');
              res.body.errors.messages.should.not.containEql('Path `username` is required.');
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
                res.body.errors.messages.should.containEql('Path `username` is required.');
                res.body.errors.messages.should.containEql('Path `password` is required.');
              done();
            });
        });
      });
    });

    describe('Login', function(){
      beforeEach(function(done){
        var _this = this;
        var user = new User(userData);

        user.save(function(err, user){
          if(err) return done(err);
          _this.user = user;
          done();
        });
      });

      it('should fail due to invalid username', function(done){
        var data = {
          username: 'robert',
          password: 'password123'
        };
        req.post('/login')
          .send(data)
          .expect(401)
          .end(function(err, res){
            if(err) return done(err);
            res.text.should.match(/Unauthorized/);
            done();
          });
      });

      it('should fail user due to invalid password', function(done){
        var data = {
          username: 'bob',
          password: 'wrongPass'
        };
        req.post('/login')
          .send(data)
          .expect(401)
          .end(function(err, res){
            if(err) return done(err);
            res.text.should.match(/Unauthorized/);
            done();
          });
      });

      it('should login user', function(done){
        var _this = this;
        req.post('/login')
          .send(userData)
          .expect(200)
          .end(function(err, res){
            res.body.user.should.not.be.null();
            res.body.success.should.equal(true);
            res.body.user.username.should.equal(_this.user.username);
            done();
          });
      });
    });

    describe('Logout', function(){
      it('should successfuly log a user out of the session', function(done){
        var _this = this;

        var user = new User(userData);

        user.save(function(err, user){
          if(err) return done(err);
          _this.user = user;
        });

        req.post('/login')
          .send(userData)
          .end(function(err, res){
            if(err) return done(err);
            req.get('/logout')
              .expect(200)
              .end(function(err, res){
                if(err) return done(err);
                res.body.success.should.equal(true);
                res.body.message.should.match(/Successfuly logged out./);
                req.get('/walks')
                  .expect(401)
                  .end(function(err, res){
                    if(err) return done(err);
                    res.body.success.should.equal(false);
                    res.body.message.should.match(/You must login first./);
                    done();
                  });
              });
          });
      });
    });

  });
});

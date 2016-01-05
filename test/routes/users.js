var db = require('../init_db_conn');
var User = require('../../models/user');
var app = require('../../app');
var should = require('should');
var req = require('supertest').agent(app);

describe('Users', function(){
  describe('Routes', function(){
    describe.only('Authenticated', function(){
      beforeEach(function(done){
        var _this = this;
        var data = {
          username: 'bob',
          password: 'password123'
        };
        _this.data = data;

        var user = new User(data);

        user.save(function(err, user){
          if(err) return done(err);
          _this.user = user;
          done();
        });
      });

      it('should update username', function(done){
        var _this = this;
        req.post('/login')
        .send(_this.data)
        .then(function(res){
          req.put('/users/' + res.body.user._id)
          .send({ username: 'robert'})
          .expect(200)
          .end(function(err, res){
            if(err) return done(err);
            res.body.success.should.equal(true);
            res.body.user.username.should.match(/robert/);
            done();
          });
        });
      });

      it('should update password', function(done){
        var _this = this;
        req.post('/login')
        .send(_this.data)
        .then(function(res){
          req.put('/users/' + res.body.user._id)
          .send({ password: 'newPassword'})
          .expect(200)
          .end(function(err, res){
            if(err) return done(err);
            res.body.success.should.equal(true);
            User.findById(res.body.user._id, function(err, user){
              new User(user).validatePassword('newPassword')
              .should.equal('true');
            });
            done();
          });
        });
      });

      it('should update both username and password', function(done){
        var _this = this;
        req.post('/login')
        .send(_this.data)
        .then(function(res){
          req.put('/users/' + res.body.user._id)
          .send({
            username: 'robert',
            password: 'newPassword'
          })
          .expect(200)
          .end(function(err, res){
            if(err) return done(err);
            res.body.success.should.equal(true);
            res.body.user.username.should.match(/robert/);
            User.findById(res.body.user._id, function(err, user){
              new User(user).validatePassword('newPassword')
              .should.equal('true');
            });
            done();
          });
        });
      });

      it('should fail to update values due to null username', function(done){
        var _this = this;
        req.post('/login')
        .send(_this.data)
        .then(function(res){
          req.put('/users/' + res.body.user._id)
          .send({
            username: '',
            password: 'newPassword'
          })
          .expect(500)
          .end(function(err, res){
            if(err) return done(err);
            res.body.success.should.equal(false);
            res.body.errors.messages.should.containEql('Path `username` is required.');
            done();
          });
        });
      });

      it('should fail to update due to null password', function(done){
        var _this = this;
        req.post('/login')
        .send(_this.data)
        .then(function(res){
          console.log(res.body.user.password);
          req.put('/users/' + res.body.user._id)
          .send({
            username: 'robert',
            password: ''
          })
          .end(function(err, res){
            if(err) return done(err);
            console.log(res.body);
            res.body.success.should.equal(false);
            res.body.errors.messages.should.containEql('Path `password` is required.');
            done();
          });
        });
      });

    });

    describe('Unauthorized', function(){
      it('should return 401', function(done){
        req.get('/users')
        .expect(401)
        .end(function(err, res){
          if(err) return done(err);
          res.text.should.match(/You must login first./);
          done();
        });
      });

      it('should fail to update username and password and return 401', function(done){
        var data = {
          username: 'bob',
          password: 'password123'
        };
        var user = new User(data);

        user.save(function(err,user){
          if(err) return done(err);
          req.put('/users/' + user._id)
          .send({ username: 'robert', password: 'newPassword'})
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
});

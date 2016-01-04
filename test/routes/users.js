var db = require('../init_db_conn');
var User = require('../../models/user');
var app = require('../../app');
var should = require('should');
var req = require('supertest').agent(app);

describe.only('Users', function(){
  describe('Routes', function(){
    describe('Authenticated', function(){
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
                console.log(res.body);
                res.body.success.should.equal(true);
                res.body.user.username.should.not.match(/robert/);
                done();
            });
        });
      });

    });
  });

  describe('Unauthenticated', function(){
        it('should return 401', function(done){
      req.get('/users')
        .expect(401)
        .end(function(err, res){
          if(err) return done(err);
          res.text.should.match(/You must login first./);
          done();
        });
    });
  });
});

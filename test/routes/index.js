var app = require('../../app');
var should = require('should');
var req = require('supertest')(app);

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

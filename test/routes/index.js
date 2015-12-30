var app = require('../../app');
var request = require('supertest');
var agent = request.agent(app);

describe('Index Routes', function(){
  it('should return 200', function(done){
      agent.get('/').expect(200, done);
  });

  it('should fail horribly', function(done){
    agent.get('/fail').expect(401, done);
  });
});

describe('Walks Routes', function(){
  it('should return 401', function(done){
    agent.get('/walks').expect(401, done);
  });
});

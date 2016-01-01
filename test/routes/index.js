var app = require('../../app');
var agent = require('supertest').agent(app);

describe('Index Routes', function(){
  it('should return 200', function(done){
      agent.get('/').expect(200, done);
  });
    it('should fail horribly', function(done){
    agent.get('/fail').expect(401, done);
  });
});

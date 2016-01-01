var app = require('../../app');
var agent = require('supertest').agent(app);

describe('Users Routes Unauthorized', function(){
  it('should return 401', function(done){
      agent.get('/users').expect(401, done);
  });
});

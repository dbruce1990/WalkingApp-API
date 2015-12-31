module.exports = function(agent){
  describe('Users Routes Unauthorized', function(){
    it('should return 401', function(done){
        agent.get('/users').expect(401, done);
    });
  });
};

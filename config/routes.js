module.exports = function(app){
  var routes = require('../routes/index');
  var users = require('../routes/users');
  var walks = require('../routes/walks');

  var isAuthenticated = function(req, res, next){
    if(req.isAuthenticated())
      next();
    res.status(401).send('You must login first.');
  };

  app.use('/', routes);
  app.all('/*', isAuthenticated);
  app.use('/users', users);
  app.use('/walks', walks);
};

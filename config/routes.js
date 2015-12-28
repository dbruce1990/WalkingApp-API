module.exports = function(app){
  var routes = require('../routes/index');
  var users = require('../routes/users');
  var walks = require('../routes/walks');

  app.use('/', routes);
  app.use('/users', users);
  app.use('/walks', walks);
};

module.exports = function(app){
  var index = require('../routes/index');
  var users = require('../routes/users');
  var walks = require('../routes/walks');

  var isAuthenticated = function(req, res, next){
    if(req.isAuthenticated())
      return next();
    return res.status(401).send({ success: false, message: 'You must login first.'});
  };

  app.use('/', index);
  app.all('*', isAuthenticated);
  app.use('/users', users);
  app.use('/walks', walks);
};

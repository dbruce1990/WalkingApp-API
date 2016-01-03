var User = require('../models/user.js');
var handleError = require('../handlers/error');
var controller = {};

controller.index = function(req, res, next) {
  return res.render('index', { title: 'Express' });
};

controller.render_signup = function(req, res){
  return res.render('signup');
};

controller.signup = function(req, res){
  console.log(req.body);
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;

  user.save(function(err, user){
    if(err) {
      console.log(err.code);
      return handleError(res, err);
    }
    return res.send(user);
  });
};


controller.render_login = function(req, res){
  return res.render('login');
};
controller.login = function(req, res){
  return res.send({user: req.user });
};

module.exports = controller;

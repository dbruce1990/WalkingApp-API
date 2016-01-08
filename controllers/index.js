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
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(function(err, user){
    if(err) return handleError(res, err);
    var sanatized_user = JSON.parse(JSON.stringify(user));
    delete sanatized_user.password;
    return res.send({success: true, user: sanatized_user});
  });
};


controller.render_login = function(req, res){
  return res.render('login');
};

controller.login = function(req, res){
  return res.send({success: true, user: req.user });
};

controller.logout = function(req, res){
  if(req.isAuthenticated()){
    req.logout();
    return res.send({ success: true, message: 'Successfuly logged out.' });
  }
  return res.send({ success: false, message: 'You must login first.' });
};

module.exports = controller;

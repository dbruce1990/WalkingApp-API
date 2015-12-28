var User = require('../models/user.js');
var errorHandler = require('../handlers/databaseError');
var controller = {};

controller.index = function(req, res, next) {
  res.render('index', { title: 'Express' });
};

controller.signup = function(req, res){
  console.log(req.body);
  var user = new User();
  user.username = req.body.username;
  user.password = user.generateHash(req.body.password);

  user.save(function(err, user){
    console.log(err.code);
    if(err) errorHandler(res, err);
    return res.send(user);
  });
};

controller.login = function(req, res){
  res.sendStatus(200);
};

module.exports = controller;

var User = require('../models/user.js');
var handleError = require('../handlers/error');
var controller = {};

controller.getAll = function(req, res){
  User.find().exec(function(err, user){
    console.log('hello');
    if(err) handleError(res, err);
    return res.send(user);
  });
};

module.exports = controller;

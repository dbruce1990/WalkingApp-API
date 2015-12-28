var User = require('../models/user.js');
var errorHandler = require('../handlers/databaseError');
var controller = {};



controller.getAll = function(req, res){
  User.find().exec(function(err, user){
    if(err) errorHandler(res, err);
    return res.send(user);
  });
};

module.exports = controller;

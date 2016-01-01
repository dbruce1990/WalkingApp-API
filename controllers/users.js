var User = require('../models/user.js');
var handleError = require('../handlers/error');
var controller = {};

controller.getAll = function(req, res){
  User.find().exec(function(err, user){
    // if(err) return handleError(res, err);
    if(err) {
      console.log(err);
      throw err;
    }
    return res.send(user);
  });
};

module.exports = controller;

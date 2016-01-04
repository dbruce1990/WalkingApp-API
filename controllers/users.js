var User = require('../models/user.js');
var handleError = require('../handlers/error');
var controller = {};

controller.getAll = function(req, res){
  User.find().exec(function(err, user){
    if(err) return handleError(res, err);
    return res.send(user);
  });
};

controller.update = function(req, res){
  var updateData = { $set: req.body };

  User.findByIdAndUpdate(req.user._id, updateData, function(err, user){
    if(err) return handleError(res, err);
    console.log('user: ');
    console.log(user);
    res.send({success: true, user: user});
  });
};

module.exports = controller;

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
  var query = { _id: req.user._id };
  var updateData = { $set: req.body };

  User.findOneAndUpdate(query, updateData, {new: true},function(err, user){
    if(err) return handleError(res, err);
    if(user)
      res.send({success: true, user: user});
    else {
      res.send({success: false, user: user });
    }
  });
};

module.exports = controller;

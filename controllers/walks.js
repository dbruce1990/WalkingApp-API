var Walk = require('../models/walk.js');
var handleError = require('../handlers/error');
var controller = {};

controller.getAll = function(req, res){
  Walk.find()
    .where({_user: req.user._id})
    .sort({createdAt: -1})
    .exec(function(err, walks){
      if(err) return handleError(res, err);
      return res.send({ walks: walks });
    });
};

controller.getById = function(req, res){
  var query = {
    _id: req.params._id,
    _user: req.user._id
  };
  Walk.findOne()
    .where(query)
    .exec(function(err, walk){
      if(err) return handleError(res, err);
      return res.send({ success: true, walk: walk });
    });
};

controller.create = function (req, res, next) {
  var walk = new Walk();
  walk.description = req.body.description;
  walk.createdAt = req.body.createdAt;
  walk.elapsedTime = req.body.elapsedTime;
  walk.distance = req.body.distance;
  walk.waypoints = req.body.waypoints;
  walk._user = req.user._id;

  walk.save(function(err, walk){
    if(err) return handleError(res, err);
    return res.send({ success: true, walk: walk });
  });
};

controller.update =  function(req, res, next){
  Walk.findById(req.body._id, function(err, walk){
    if(err) return handleError(res, err);
    walk.description = req.body.description;
    walk.createdAt = req.body.createdAt;
    walk.elapsedTime = req.body.elapsedTime;
    walk.distance = req.body.distance;
    walk.waypoints = req.body.waypoints;

    walk.save(function(err, walk){
      if(err) return handleError(res, err);
      console.log(walk);
      return res.send({ success: true, walk: walk });
    });
  });
};

controller.delete = function(req,res,next){
  Walk.findByIdAndRemove(req.params._id, function(err){
    if(err) return handleError(res, err);
    return res.send({ success: true });
  });
};

module.exports = controller;

var Walk = require('../models/walk.js');
var handleError = require('../handlers/error');
var controller = {};

controller.getAll = function(req, res){
  Walk.find().sort({createdAt: -1}).exec(function(err, walks){
    if(err) handleError(res, err);
    return res.send(walks);
  });
};

controller.getById = function(req, res){
  console.log(req.params);
  Walk.findById(req.params._id, function(err, walk){
    if(err) handleError(res, err);
    console.log(walk);
    return res.send(walk).status(200);
  });
};

controller.create = function (req, res, next) {
  var walk = new Walk();
  walk.description = req.body.description;
  walk.createdAt = req.body.createdAt;
  walk.elapsedTime = req.body.elapsedTime;
  walk.distance = req.body.distance;
  walk.waypoints = req.body.waypoints;

  walk.save(function(err, walk){
    if(err) handleError(res, err);
    return res.send(walk).status(200);
  });
};

controller.update =  function(req, res, next){
  Walk.findById(req.body._id, function(err, walk){
    if(err) handleError(res, err);
    walk.description = req.body.description;
    walk.createdAt = req.body.createdAt;
    walk.elapsedTime = req.body.elapsedTime;
    walk.distance = req.body.distance;
    walk.waypoints = req.body.waypoints;

    walk.save(function(err, walk){
      if(err) handleError(res, err);
      console.log(walk);
      return res.send(walk).status(200);
    });
  });
};

controller.delete = function(req,res,next){
  Walk.findByIdAndRemove(req.params._id, function(err){
    if(err) handleError(res, err);
    return res.sendStatus(200);
  });
};

module.exports = controller;

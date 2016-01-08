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
  var walk = new Walk({
    description: req.body.description,
    elapsedTime: req.body.elapsedTime,
    distance: req.body.distance,
    waypoints: req.body.waypoints,
    _user: req.user._id
  });

  walk.save(function(err, walk){
    if(err) return handleError(res, err);
    return res.send({ success: true, walk: walk });
  });
};

controller.update = function(req, res, next){
  var id = req.params._id;
  var query = req.body;
  var options = {
    new: true,
    runValidators: true
  };
  Walk.findByIdAndUpdate(id, query, options, function(err, walk){
    if(err) return handleError(res, err);
    return res.send({ success: true, walk: walk });
  });
};

controller.delete = function(req,res,next){
  Walk.findByIdAndRemove(req.params._id, function(err){
    if(err) return handleError(res, err);
    return res.send({ success: true });
  });
};

module.exports = controller;

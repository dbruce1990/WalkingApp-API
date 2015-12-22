var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Walk = require('../models/walk.js');

var errorMsg = function(err){
  console.log(err);
  throw err;
};

router.get('/', function(req, res){
  Walk.find().sort({createdAt: -1}).exec(function(err, walks){
    if(err) errorMsg(err);
    return res.send(walks).status(200);
  });
});

router.get('/:_id', function(req, res){
  console.log(req.params);
  Walk.findById(req.params._id, function(err, walk){
    if(err) errorMsg(err);
    console.log(walk);
    return res.send(walk).status(200);
  });
});

router.post('/', function (req, res, next) {
  var walk = new Walk();
  walk.description = req.body.description;
  walk.createdAt = req.body.createdAt;
  walk.elapsedTime = req.body.elapsedTime;
  walk.distance = req.body.distance;
  walk.waypoints = req.body.waypoints;

  walk.save(function(err, walk){
    if(err) errorMsg(err);
    return res.send(walk).status(200);
  });
});

router.put('/', function(req, res, next){
  Walk.findById(req.body._id, function(err, walk){
    if(err) errorMsg(err);

    walk.description = req.body.description;
    walk.createdAt = req.body.createdAt;
    walk.elapsedTime = req.body.elapsedTime;
    walk.distance = req.body.distance;
    walk.waypoints = req.body.waypoints;

    walk.save(function(err, walk){
      if(err) errorMsg(err);
      console.log(walk);
      return res.send(walk).status(200);
    });
  });
});

router.delete('/:_id', function(req,res,next){
  Walk.findByIdAndRemove(req.params._id, function(err){
    if(err) errorMsg(err);
    return res.sendStatus(200);
  });
});

module.exports = router;

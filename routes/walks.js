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
    if(err) return errorMsg(err);
    res.send(walks).status(200);
  });
});

router.get('/:_id', function(req, res){
  console.log(req.params);
  Walk.findById(req.params._id, function(err, walk){
    if(err) return errorMsg(err);
    console.log(walk);

    res.send(walk).status(200);
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
    if(err) return errorMsg(err);
    res.send(walk).status(200);
  });

});

router.put('/', function(req, res, next){
  Walk.findById(req.body._id, function(err, walk){
    if(err) return errorMsg(err);

    walk.description = req.body.description;
    walk.createdAt = req.body.createdAt;
    walk.elapsedTime = req.body.elapsedTime;
    walk.distance = req.body.distance;
    walk.waypoints = req.body.waypoints;

    walk.save(function(err, walk){
      if(err) return errorMsg(err);
      console.log(walk);
      res.send(walk).status(200);
    });
  });
});

router.delete('/', function(req,res,next){
  res.sendStatus(200);
});

module.exports = router;

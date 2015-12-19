var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Walk = require('../models/walk.js');

router.get('/', function(req, res){
  Walk.find().sort({createdAt: -1}).exec(function(err, results){
    if(err){
      throw err;
      console.log(err);
    }
    res.json(results);
  });
});

router.post('/', function (req, res, next) {
  var walk = new Walk();
  walk.description = req.body.description;
  walk.createdAt = req.body.createdAt;
  walk.elapsedTime = req.body.elapsedTime;
  walk.distance = req.body.distance;
  walk.waypoints = req.body.waypoints;

  console.log(walk);
  walk.save(function(err, walk){
    if(err){
      console.log(err);
    }
    else{
      res.sendStatus(200);
    }
  });
})



module.exports = router;

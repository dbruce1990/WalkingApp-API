var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Walk = require('../models/walk.js');

router.get('/', function(req, res){
  res.send("Hello from /walk");
});

router.post('/create', function (req, res, next) {
  console.log(req.body);

  var walk = new Walk();
  walk.description = req.body.description;

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

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var walk = require('../models/walk.js');

router.get('/', function(req, res){
  res.send("Hello from /walk");
});

router.post('/create', function (req, res, next) {
  console.log(req.body);
  res.sendStatus(200);
})

module.exports = router;

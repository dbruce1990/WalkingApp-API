var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

// router.get('/', function(res, req){
//     User.find(function(err, users){
//       res.send(users);
//     });
// });
var errorMsg = function(err){
  console.log(err);
  throw err;
};

router.get('/', function(req, res){
  User.find().exec(function(err, user){
    if(err) errorMsg(err);
    return res.send(user).status(200);
  });
});

router.post('/signup', function(req, res){
  console.log(req.body);
  var user = new User();
  user.username = req.body.username;
  user.password = user.generateHash(req.body.password);

  user.save(function(err, user){
    if(err) return errorMsg(err);
    return res.send(user);
  });
});

module.exports = router;

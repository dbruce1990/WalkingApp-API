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


module.exports = router;

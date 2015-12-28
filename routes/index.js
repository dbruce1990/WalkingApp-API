var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

router.post('/login', passport.authorize('local'), function(req, res){
  res.sendStatus(200);
});

module.exports = router;

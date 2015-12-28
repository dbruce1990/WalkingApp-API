var router = require('express').Router();
var passport = require('passport');
var controller = require('../controllers/index');

router.get('/', controller.index);

router.post('/signup', controller.signup);

router.post('/login', passport.authorize('local'), controller.login);

module.exports = router;

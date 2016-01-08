var router = require('express').Router();
var passport = require('passport');
var controller = require('../controllers/index');

router.get('/', controller.index);

router.get('/signup', controller.render_signup);

router.post('/signup', controller.signup);

router.get('/login', controller.render_login);

router.post('/login', passport.authenticate('local'), controller.login);

router.get('/logout', controller.logout);

router.get('/isLoggedIn', controller.isLoggedIn);

module.exports = router;

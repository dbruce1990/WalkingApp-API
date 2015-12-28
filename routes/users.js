var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');


router.get('/', controller.getAll);

module.exports = router;

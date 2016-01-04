var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');

router.get('/', controller.getAll);

router.put('/:id', controller.update);

module.exports = router;

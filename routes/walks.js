var router = require('express').Router();
var controller = require('../controllers/walks');

router.get('/', controller.getAll);

router.get('/:_id', controller.getById);

router.post('/', controller.create);

router.put('/', controller.update);

router.delete('/:_id', controller.delete);

module.exports = router;

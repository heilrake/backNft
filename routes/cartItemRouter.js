const Router = require('express');
const router = new Router();
const cartItemController = require('../controllers/cartItemController');

router.post('/', cartItemController.create); // создание
router.get('/', cartItemController.getAll); // получение
router.get('/:id', cartItemController.getOne);

module.exports = router;

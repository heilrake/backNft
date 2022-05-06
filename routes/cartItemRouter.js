const Router = require('express');
const router = new Router();
const ItemController = require('../controllers/ItemController');

router.post('/', ItemController.create); // создание
router.get('/', ItemController.getAll); // получение
router.get('/:id', ItemController.getOne);

module.exports = router;

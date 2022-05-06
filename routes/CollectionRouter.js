const Router = require('express');
const router = new Router();
const CollectionController = require('../controllers/CollectionController');
const CategoryController = require('../controllers/CategoryController')

router.post('/', CollectionController.create);
router.get('/', CollectionController.getAll);

module.exports = router;

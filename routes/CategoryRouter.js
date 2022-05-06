const Router = require('express');
const router = new Router();
const CategoryController = require('../controllers/CategoryController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), CategoryController.create); // создание
router.get('/', CategoryController.getAll); // получение

module.exports = router;

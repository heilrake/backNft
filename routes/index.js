const Router = require('express');
const router = new Router();
//const deviceRouter = require('./deviceRouter');
const cartItemRouter = require('./cartItemRouter');
const userRouter = require('./userRouter');
const CollectionRouter = require('./CollectionRouter');
const CategoryRouter = require('./CategoryRouter');

router.use('/user', userRouter);
router.use('/category', CategoryRouter);
router.use('/collection', CollectionRouter);
router.use('/item', cartItemRouter);

module.exports = router;

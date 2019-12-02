const express = require('express');
const productsController = require('./productsController');
const router = express.Router();

/* GET product page. */
router.get('/', productsController.get);
router.get('/:id', productsController.getById);

module.exports = router;
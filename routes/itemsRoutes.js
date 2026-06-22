const router = require('express').Router();
const itemController = require('../controllers/itemController')

router.post('/items/create', itemController.createItem)

module.exports = router;
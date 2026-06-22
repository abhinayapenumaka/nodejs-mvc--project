const itemService = require('../services/itemService')

const itemController = {
    createItem: async(req, res, next) => {
        try {
            const newItem = await itemService.createItem(req.body);
            return res.status(201).json(newItem)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = itemController;
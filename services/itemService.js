const Item = require('../models/item');

const itemService = {
    createItem: async(itemData) =>  {
        try {
            await Item.create(itemData);
            return {
                status:true,
                message: 'Item Created Successfully'
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = itemService
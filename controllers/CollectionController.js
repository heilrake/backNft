const { Collection} = require('../models/models');
const ApiError = require('../error/ApiError');

class CollectionController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Collection.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Collection.findAll();
    return res.json(brands);
  }
}
module.exports = new CollectionController();

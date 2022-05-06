const uuid = require('uuid');
const path = require('path');
const { Item, ItemInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class cartItemController {
  async create(req, res, next) {
    try {
      let { name, price, collectionId, categoryId, info, img } = req.body;
      // const { img } = req.files;
      // let fileName = uuid.v4() + '.jpg';
      //img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const item = await Item.create({ name, price, collectionId, categoryId, img });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ItemInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          }),
        );
      }

      return res.json(item);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    /*let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
*/
    const devices = await Item.findAll();

    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Item.findOne({
      where: { id },
      include: [{ model: ItemInfo, as: 'info' }],
    });
    return res.json(device);
  }
}

module.exports = new cartItemController();

const uuid = require('uuid');
const path = require('path');
const { ItemCard, ItemInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class cartItemController {
  async create(req, res, next) {
    try {
      // получаем данние из тела запроса
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4 + '.jpg'; // делаем уникальное название для картинок
      img.mv(path.resolve(__dirname, '..', 'static', fileName)); // мутим с путем к папке
      const itemCard = await ItemCard.create({ name, price, brandId, typeId, img: fileName });

      if (info) {
        info = JSON.parse(info);
        info.array.forEach((element) => {
          ItemInfo.create({
            title: element.title,
            description: element.description,
            itemId: itemCard.id,
          });
        });
      }

      return res.json(itemCard);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    const { brandId, typeId, limit, page } = req.query; // req.query; получаем из строки запроса
    // limit количество карточек на одной странице
    page = page || 1; // указиваем по дефолтку 1 если не пришло значение
    limit = limit || 12; // так же по дефолтку 12
    let offset = page * limit - limit; //отступ в n товаров на новой старнице

    let itemCard;
    if (!brandId && !typeId) {
      // тут короче ми шукаємо по одному из варианту , или по бренду или по типу / вернутса с бази
      itemCard = await ItemCard.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      itemCard = await ItemCard.findAndCountAll({ where: { brandId }, limit, offset });
    }
    if (!brandId && typeId) {
      itemCard = await ItemCard.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (brandId && typeId) {
      itemCard = await ItemCard.findAndCountAll({ where: { typeId, brandId }, limit, offset });
    }
    return res.json(itemCard);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const itemCard = await ItemCard.findOne({
      where: { id },
      include: [{ model: ItemInfo, as: 'info' }], // 53:48
    });
    return res.json(itemCard);
  } //получение одного елемента
}

module.exports = new cartItemController();

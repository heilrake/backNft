/*const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // описуем кажное поле бд
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }, // по дефолту обичний пользователь , но может и и администратор
  purse: { type: DataTypes.STRING }, // крипто кошелек
});

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketItem = sequelize.define('basket_item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ItemCard = sequelize.define('item_card', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, unique: true, allowNull: false },
 // category: { type: DataTypes.STRING, defaultValue: 0 }, // ? не уверен
  author: { type: DataTypes.STRING },
});
const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const ItemInfo = sequelize.define('item_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  //item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

//устанавливаем связи таблиц
User.hasOne(Basket);
Basket.belongsTo(User); //сообщаем что корзина пренадлежит usery

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

Category.hasMany(ItemCard);
ItemCard.belongsTo(Category);

ItemCard.hasMany(BasketItem);
BasketItem.belongsTo(ItemCard);

ItemCard.hasMany(ItemInfo);
ItemInfo.belongsTo(ItemCard);

module.exports = {
  User,
  Basket,
  BasketItem,
  ItemCard,
  Category,
  ItemInfo,
};*/

const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // описуем кажное поле бд
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }, // по дефолту обичний пользователь , но может и и администратор
  purse: { type: DataTypes.STRING }, // крипто кошелек
});

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketItem = sequelize.define('basket_item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Item = sequelize.define('item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.DOUBLE, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
});

const Collection = sequelize.define('collection', {
  // нужно потом переименоаать
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const ItemInfo = sequelize.define('info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

Category.hasMany(Item);
Item.belongsTo(Category);

Collection.hasMany(Item);
Item.belongsTo(Collection);

Item.hasMany(Rating);
Rating.belongsTo(Item);

Item.hasMany(BasketItem);
BasketItem.belongsTo(Item);

Item.hasMany(ItemInfo, { as: 'info' });
ItemInfo.belongsTo(Item);

Category.belongsToMany(Collection, { through: TypeBrand });
Collection.belongsToMany(Category, { through: TypeBrand });

module.exports = {
  User,
  Basket,
  BasketItem,
  Item,
  Category,
  Collection,
  Rating,
  TypeBrand,
  ItemInfo,
};

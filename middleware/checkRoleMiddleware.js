const jwt = require('jsonwebtoken');

module.exports = function ({ role }) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1]; //berar sgsgsggg
      if (!token) {
        return res.status(401).json({ message: 'Не авторизован' });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
      // логика такая , ми из jwt токена проверям роль , и сравниваем с ролью покорою передали в мидлваре
        return res.status(403).json({ message: 'Нету доступа' });
      }
      req.user = decoded;
      next(); // цим ми визиваємо наступний в цепочкі middleware
    } catch (e) {
      res.status(401).json({ message: 'Не авторизован' });
    }
  };
};

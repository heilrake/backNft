// тут ми декодируем токен и проверяем на валидность
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован 1 ' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next(); // цим ми визиваємо наступний в цепочкі middleware
  } catch (e) {
    res.status(401).json({ message: 'Не авторизован 2 ' });
  }
};


const jwt = require('jsonwebtoken');
const config = require('../../../config/config.json');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied: No Token Provided!');

  try {
    const decoded = jwt.verify(token, config.development.secret_key);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Access Denied: Invalid Token!');
  }
};
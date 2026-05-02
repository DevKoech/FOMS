const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const header = req.headers.authorization || req.headers.Authorization;
  const token = header && header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { auth };
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    
    if (!header) {
      return res.status(401).json({ error: 'Missing authorization header' });
    }

    const token = header.startsWith('Bearer ') ? header.slice(7) : header;
    
    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { auth };
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'darz-secret';

// const auth = (req, res, next) => {
//   const token = req.headers['x-admin-token'];
//   if (token === process.env.ADMIN_TOKEN) {
//     next();
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// };

const auth = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  if (!token) return res.status(403).send('No token provided');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).send('Not authorized');
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

module.exports = auth;


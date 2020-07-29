const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const token = req.headers['x-auth-token'] || req.headers['authorization']
  if (!token) return res.status(401).send('Access denied. No token Provided.')
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

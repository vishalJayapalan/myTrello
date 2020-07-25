const jwt = require('jsonwebtoken')
require('dotenv').config()
// const config = require('config')

module.exports = (req, res, next) => {
  console.log('authorization', req.headers['authorization'])
  console.log('xAuthToken', req.headers['x-auth-token'])
  console.log('xAccessToken', req.headers['x-access-token'])
  console.log('cookie', req.headers.cookie)
  console.log(req.headers)
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

const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  let token = null
  const cookieHeaderString = req.headers.cookie

  if (cookieHeaderString) {
    const cookies = cookieHeaderString.split(';')

    for (const cookie of cookies) {
      const [key, value] = cookie.split('=')
      if (key === 'x-auth-token') {
        token = value
        break
      }
    }
  }

  if (!token) return res.status(401).send('Access denied. No token Provided.')
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

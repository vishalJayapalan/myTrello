const Router = require('express').Router()
const auth = require('../middleware/auth')

const userController = require('../controllers/user.js')

Router.get('/', auth, userController.getUser)

Router.get('/all', auth, userController.getUsers)

Router.post('/', userController.addUser)
Router.post('/login', userController.login)

module.exports = Router

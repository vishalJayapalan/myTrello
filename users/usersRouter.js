const Router = require('express').Router()
const auth = require('../middleware/auth')

const userController = require('./usersController')

Router.get('/', auth, userController.getUser)

Router.get('/all', auth, userController.getUsers)

Router.post('/', userController.registerUser)
Router.post('/login', userController.login)

module.exports = Router

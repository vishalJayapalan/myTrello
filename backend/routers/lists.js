const express = require('express')
const Router = express.Router()
const auth = require('../middleware/auth')

const listController = require('../controllers/list')

const cardRouter = require('./cards')

Router.use('/card', cardRouter)

Router.get('/:id', auth, listController.getLists)

Router.post('/:id', auth, listController.createList)

Router.post('/:id/:listIndex', auth, listController.createListByIndex)

Router.put('/:id/:listId', auth, listController.updateList)

Router.delete('/:id/:listId', auth, listController.deleteList)

module.exports = Router

const express = require('express')
const Router = express.Router()

const listController = require('../controllers/list')

const cardRouter = require('./cards')

Router.use('/card', cardRouter)

Router.get('/:id', listController.getLists)

Router.post('/:id', listController.createList)

Router.put('/:id/:listId', listController.updateList)

Router.delete('/:id/:listId', listController.deleteList)

module.exports = Router

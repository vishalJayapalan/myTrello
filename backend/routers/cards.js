const express = require('express')
const Router = express.Router()

const cardController = require('../controllers/card.js')

Router.get('/:id/:listId', cardController.getCards)

Router.post('/:id/:listId', cardController.createCard)

Router.post('/:id/:listId/:cardIndex', cardController.createCardByIndex)

Router.put('/:id/:listId/:cardId', cardController.updateCard)

Router.delete('/:id/:listId/:cardId', cardController.deleteCard)

module.exports = Router

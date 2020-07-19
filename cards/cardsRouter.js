const express = require('express')
const Router = express.Router()

const auth = require('../middleware/auth')

const cardController = require('./cardsController')

Router.get('/:id/:listId', auth, cardController.getCards)

Router.post('/:id/:listId', auth, cardController.createCard)

Router.post('/:id/:listId/:cardIndex', auth, cardController.createCardByIndex)

Router.put('/:id/:listId/:cardId', auth, cardController.updateCard)

Router.delete('/:id/:listId/:cardId', auth, cardController.deleteCard)

module.exports = Router

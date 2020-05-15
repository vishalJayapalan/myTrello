const express = require('express')
const Router = express.Router()

const boardController = require('../controllers/board.js')

Router.get('/', boardController.getBoards)
Router.post('/', boardController.createBoard)
Router.put('/:id', boardController.updateBoard)
Router.delete('/:id', boardController.deleteBoard)

module.exports = Router

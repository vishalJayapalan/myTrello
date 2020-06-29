const express = require('express')
// const app = express()
const auth = require('../middleware/auth')
const Router = express.Router()

const boardController = require('../controllers/board.js')

Router.get('/', auth, boardController.getBoards)
Router.post('/', auth, boardController.createBoard)
Router.put('/:id', auth, boardController.updateBoard)
Router.delete('/:id', auth, boardController.deleteBoard)

module.exports = Router

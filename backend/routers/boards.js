const express = require('express')
// const app = express()
const auth = require('../middleware/auth')
const Router = express.Router()

const boardController = require('../controllers/board.js')

// Router.get('/', auth, boardController.getBoards)

Router.get('/', auth, boardController.getBoards2)

Router.post('/', auth, boardController.createBoard)
Router.post('/team/:id', boardController.addTeamMember)
Router.put('/team/:id', boardController.removeTeamMember)
Router.put('/:id', auth, boardController.updateBoard)
Router.delete('/:id', auth, boardController.deleteBoard)

module.exports = Router

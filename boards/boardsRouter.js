const express = require('express')
const auth = require('../middleware/auth')
const Router = express.Router()

const boardController = require('./boardsController.js')

Router.get('/team', auth, boardController.getBoardsTeam)

Router.post('/team', auth, boardController.createBoard)
Router.post('/team/:id', auth, boardController.addTeamMember)
Router.put('/team/:id', auth, boardController.removeTeamMember)
Router.put('/:id', auth, boardController.updateBoard)
Router.delete('/:id', auth, boardController.deleteBoard)

module.exports = Router

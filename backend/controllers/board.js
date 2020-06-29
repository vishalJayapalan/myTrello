const Board = require('../models/boards')

/*
  route :  /
*/

const getBoards = (req, res) => {
  Board.find({ adminUser: req.user._id })
    .then(board => {
      return res.json(board)
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

/*
  route :  /
*/

const createBoard = (req, res) => {
  const board = new Board()
  board.boardName = req.body.boardName
  board.adminUser = req.user._id
  board
    .save()
    .then(() => res.json({ boardId: board._id }))
    .catch(err => res.status(400).json('Error: ' + err))
}

/*
  route :  /:id
  id is the BoardId
*/

const updateBoard = (req, res) => {
  Board.findById(req.params.id)
    .then(board => {
      board[`${req.body.name}`] = req.body.value
      board
        .save()
        .then(() => res.json('updated'))
        .catch(err => res.json('ERROR: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

/*
  route :  /:id
  id is the BoardID
*/

const deleteBoard = (req, res) => {
  Board.findByIdAndDelete(req.params.id)
    .then(() => res.json('deleted Board'))
    .catch(err => res.status(400).json('Error: ' + err))
}

module.exports = { getBoards, createBoard, deleteBoard, updateBoard }

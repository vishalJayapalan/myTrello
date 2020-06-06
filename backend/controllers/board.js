const Board = require('../models/boards')

const getBoards = (req, res) => {
  Board.find()
    .then(board => res.json(board))
    .catch(err => res.status(400).json('Error: ' + err))
}

const createBoard = (req, res) => {
  const board = new Board()
  board.boardName = req.body.boardName
  board
    .save()
    .then(() => res.json({ boardId: board._id }))
    .catch(err => res.status(400).json('Error: ' + err))
}

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

const deleteBoard = (req, res) => {
  Board.findByIdAndDelete(req.params.id)
    .then(() => res.json('deleted Board'))
    .catch(err => res.status(400).json('Error: ' + err))
}

module.exports = { getBoards, createBoard, deleteBoard, updateBoard }

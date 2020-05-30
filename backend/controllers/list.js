const Board = require('../models/boards')
// const mongoose = require('mongoose')

const getLists = (req, res) => {
  Board.findById(req.params.id)
    .then(list => {
      res.json(list)
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

const createList = (req, res) => {
  const list = req.body
  // list.boardId = req.params.id
  // list.listId = new mongoose.Types.ObjectId()
  Board.findById(req.params.id)
    .then(board => {
      board.lists.push(list)
      board
        .save()
        .then(() =>
          res.json({ listId: board.lists[board.lists.length - 1]._id })
        )
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

const deleteList = (req, res) => {
  Board.findById(req.params.id)
    .then(board => {
      const index = board.lists.findIndex(list => list._id == req.params.listId)
      if (index == -1) {
        res.status(404).json({
          type: 'error',
          message: 'The list/board you are looking for is not found'
        })
      }
      board.lists.splice(index, 1)
      board
        .save()
        .then(() => res.json('listDeleted'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

const updateList = (req, res) => {
  // console.log(req.body)
  Board.findById(req.params.id)
    .then(board => {
      const index = board.lists.findIndex(list => list._id == req.params.listId)
      board.lists[index].listName = req.body.listName
      board
        .save()
        .then(() => res.json('updated'))
        .catch(err => res.status(400).json('ERROR: ' + err))
    })
    .catch(err => res.status(400).json('ERROR: ' + err))
}

module.exports = { getLists, createList, deleteList, updateList }

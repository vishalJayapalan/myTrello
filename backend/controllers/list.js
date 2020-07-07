const Board = require('../models/boards')
// const mongoose = require('mongoose')

/*
route : /board/id
id is the BOard Id
*/

const getLists = (req, res) => {
  Board.findById(req.params.id)
    .then(board => {
      if (board.adminUser == req.user._id) {
        res.json(board)
      }
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

/*
route : /board/id
id is the BOard Id
*/

const createList = (req, res) => {
  const list = req.body
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

/*
  route : /board/id/listIndex
  id is the board Id
*/

const createListByIndex = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    board.lists.splice(req.params.listIndex, 0, req.body)
    await board.save()
    res.json({
      cardId: board.lists[`${req.params.listIndex}`]._id
    })
  } catch (err) {
    res.status(400).json('ERROR : ' + err)
  }
}

/*
route : /board/id/listId
id is the BOard Id
*/

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

/*
route : /board/id/listId
id is the BOard Id
*/

const updateList = (req, res) => {
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

module.exports = {
  getLists,
  createList,
  createListByIndex,
  deleteList,
  updateList
}

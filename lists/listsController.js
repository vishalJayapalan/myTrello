const Board = require('../boards/boardsModel')

/*
route : /board/id
id is the BOard Id
*/

const getLists = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (!board.team.includes(req.user._id)) {
      return res.status(404).json({ msg: 'Not authorized' })
    }
    return res.status(200).json(board)
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}
/*
route : /board/id
id is the BOard Id
*/

const createList = async (req, res) => {
  try {
    const list = req.body
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      board.lists.push(list)
      await board.save()
      return res
        .status(200)
        .json({ listId: board.lists[board.lists.length - 1]._id })
    }
    return res.status(400).json({ msg: 'not authorised to update this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

/*
  route : /board/id/listIndex
  id is the board Id
*/

const createListByIndex = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      board.lists.splice(req.params.listIndex, 0, req.body)
      await board.save()
      return res.status(200).json({
        cardId: board.lists[`${req.params.listIndex}`]._id
      })
    }
    return res.status(400).json({ msg: 'not authorised to update this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

/*
route : /board/id/listId
id is the BOard Id
*/

const deleteList = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      const index = board.lists.findIndex(
        list => list._id.toString() === req.params.listId
      )
      if (index === -1) {
        res.status(404).json({
          type: 'error',
          message: 'The list/board you are looking for is not found'
        })
      }
      board.lists.splice(index, 1)
      await board.save()
      return res.status(200).json('listDeleted')
    }
    return res.status(400).json({ msg: 'not authorised to update this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

/*
route : /board/id/listId
id is the BOard Id
*/

const updateList = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      const index = board.lists.findIndex(
        list => list._id.toString() === req.params.listId
      )
      board.lists[index].listName = req.body.listName
      await board.save()
      return res.status(200).json('updated')
    }
    return res.status(400).json({ msg: 'not authorised to update this board' })
  } catch (err) {
    Board.findById(req.params.id)
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

module.exports = {
  getLists,
  createList,
  createListByIndex,
  deleteList,
  updateList
}

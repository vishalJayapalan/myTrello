const Board = require('../boards/boardsModel')

/*
route : /board/card/id/listId
id is the Board Id
*/

const getCards = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      return res.status(200).json(board)
    }
    return res.status(400).json({ msg: 'not authorised to update this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

/*
route : /board/card/id/listId
id is the BOard Id
*/

const createCard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      const index = board.lists.findIndex(
        list => list._id.toString() === req.params.listId
      )
      board.lists[index].cards.push(req.body)
      await board.save()
      return res.status(200).json({
        cardId:
          board.lists[index].cards[board.lists[index].cards.length - 1]._id
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
route : /board/card/id/listId/cardId
id is the BOard Id
*/

const createCardByIndex = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      const index = board.lists.findIndex(
        list => list._id.toString() === req.params.listId
      )
      board.lists[index].cards.splice(req.params.cardIndex, 0, req.body)
      await board.save()
      return res.status(200).json({
        cardId: board.lists[index].cards[`${req.params.cardIndex}`]._id
      })
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

/*
route : /board/card/id/listId/cardId
id is the BOard Id
*/

const deleteCard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      const index = board.lists.findIndex(
        list => list._id.toString() === req.params.listId
      )
      const cardIndex = board.lists[index].cards.findIndex(
        card => card._id.toString() === req.params.cardId
      )
      board.lists[index].cards.splice(cardIndex, 1)
      await board.save()
      return res.status(200).json('deleted')
    }
    return res.status(400).json({ msg: 'not authorised to update this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

/*
route : /board/card/id/listId/cardId
id is the BOard Id
*/

const updateCard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      const index = board.lists.findIndex(
        list => list._id.toString() === req.params.listId
      )
      const cardIndex = board.lists[index].cards.findIndex(
        card => card._id.toString() === req.params.cardId
      )
      board.lists[index].cards[cardIndex][`${req.body.name}`] = req.body.value
      await board.save()
      return res.status(200).json('updated')
    }
    return res.status(400).json({ msg: 'not authorised to update this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

module.exports = {
  getCards,
  createCard,
  createCardByIndex,
  deleteCard,
  updateCard
}

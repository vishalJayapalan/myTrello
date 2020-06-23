const Board = require('../models/boards')

const getCards = async (req, res) => {
  try {
    const boards = await Board.findById(req.params.id)
    res.json(boards)
  } catch (err) {
    res.status(400).json('Error: ' + err)
  }
}

const createCard = async (req, res) => {
  const board = await Board.findById(req.params.id)
  const index = board.lists.findIndex(list => list._id == req.params.listId)
  board.lists[index].cards.push(req.body)
  await board.save()
  res.json({
    cardId: board.lists[index].cards[board.lists[index].cards.length - 1]._id
  })
}

// const createCardByIndex = async (req, res) => {
//   try {
//     const board = await Board.findById(req.params.id)
//     const index = board.lists.findIndex(list => list._id == req.params.listId)
//     // const cards = board.lists[index].cards
//     board.lists[index].cards.push(req.body)
//     await board.save()
//     res.json({
//       cardId: board.lists[index].cards[`${req.params.cardIndex}`]._id
//     })
//   } catch (err) {
//     res.status(400).json('ERROR : ' + err)
//   }
// }

const createCardByIndex = async (req, res) => {
  try {
    // console.log(req.params.id, req.params.listId, req.params.cardIndex)
    // console.log(req.body)
    const board = await Board.findById(req.params.id)
    const index = board.lists.findIndex(list => list._id == req.params.listId)
    board.lists[index].cards.splice(req.params.cardIndex, 0, req.body)
    // board.lists[index].cards.push(req.body)
    // console.log('inhere')
    await board.save()
    // console.log('checkHere')
    res.json({
      cardId: board.lists[index].cards[`${req.params.cardIndex}`]._id
    })
  } catch (err) {
    res.status(400).json('ERROR : ' + err)
  }
}

const deleteCard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    const index = board.lists.findIndex(list => list._id == req.params.listId)
    const cardIndex = board.lists[index].cards.findIndex(
      card => card._id == req.params.cardId
    )
    board.lists[index].cards.splice(cardIndex, 1)
    await board.save()
    res.json('deleted')
  } catch (err) {
    res.status(400).json('Error: ' + err)
  }
}

const updateCard = async (req, res) => {
  try {
    // console.log('inhere')
    // console.log(req.params.id, req.params.listId, req.params.cardId)
    const board = await Board.findById(req.params.id)
    const index = board.lists.findIndex(list => list._id == req.params.listId)
    // console.log(index)
    const cardIndex = board.lists[index].cards.findIndex(
      card => card._id == req.params.cardId
    )
    // console.log(cardIndex)
    // console.log(board.lists[index].cards[cardIndex][`${req.body.name}`])
    board.lists[index].cards[cardIndex][`${req.body.name}`] = req.body.value
    await board.save()
    res.json('updated')
  } catch (err) {
    res.status(400).json('Error: ' + err)
  }
}

module.exports = {
  getCards,
  createCard,
  createCardByIndex,
  deleteCard,
  updateCard
}
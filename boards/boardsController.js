const Board = require('./boardsModel')

/*
GET
  route :  /team
*/

const getBoardsTeam = async (req, res) => {
  try {
    const boards = await Board.find()
    const teamBoards = []
    boards.forEach(board => {
      if (board.team.includes(req.user._id)) {
        teamBoards.push(board)
      }
    })
    return res.status(200).json({ boards: teamBoards, user: req.user })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

/*
  GET
  route :  /
*/

const createBoard = async (req, res) => {
  try {
    const board = new Board()
    board.boardName = req.body.boardName
    board.adminUser = req.user._id
    board.team.push(req.user._id)
    await board.save()
    res.status(201).json({ boardId: board._id })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

/*
  PUT
  route :  /:id
  id is the BoardId
*/

const updateBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      board[`${req.body.name}`] = req.body.value
      await board.save()
      return res.status(200).json({ msg: 'updated' })
    }
    return res.status(400).json({ msg: 'not authorised to update this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'There was an error. Please try again later' })
  }
}

/*
  DELETE
  route :  /:id
  id is the BoardID
*/

const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (req.user._id === board.adminUser.toString()) {
      await Board.findByIdAndDelete(req.params.id)
      return res.status(200).json({ msg: 'deleted Board' })
    }
    res.status(400).json({ msg: 'not authorised to delete this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'There was an error. Please try again later' })
  }
}

/*
  POST
  route: /team/:id
  id is the boardId
*/

const addTeamMember = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      board.team.push(req.body.teamMemberId)
      await board.save()
      return res.status(200).json(board)
    }
    return res.status(400).json({ msg: 'not authorised to delete this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'There was an error. Please try again later' })
  }
}

/*
  PUT
  route: /team/:id
  id is the boardId
*/
const removeTeamMember = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
    if (board.team.includes(req.user._id)) {
      board.team = board.team.filter(
        teamMemberId => teamMemberId.toString() !== req.body.teamMemberId
      )
      await board.save()
      return res.status(200).json(board)
    }
    return res.status(400).json({ msg: 'not authorised to delete this board' })
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'There was an error. Please try again later' })
  }
}

module.exports = {
  getBoardsTeam,
  createBoard,
  deleteBoard,
  updateBoard,
  addTeamMember,
  removeTeamMember
}

import { getCookie } from '../util/cookies'

async function createList (event, boardId, lists, updateListsState) {
  const listName = event.target.value
  event.target.value = ''
  const data = await window.fetch(`board/${boardId}`, {
    method: 'POST',
    body: JSON.stringify({ listName: listName }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })
  const jsonData = await data.json()
  console.log([...lists, { listName, _id: jsonData.listId, cards: [] }])
  updateListsState([...lists, { listName, _id: jsonData.listId, cards: [] }])
}

async function createListAtIndex (boardId, list, listIndex) {
  await window.fetch(`board/${boardId}/${listIndex}`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })
}

async function deleteList (
  boardId,
  lists,
  list,
  updateListsState,
  updateListActionToggle
) {
  const newLists = lists.filter(lis => lis._id !== list._id)
  updateListsState(newLists)
  await window.fetch(`board/${boardId}/${list._id}/`, {
    method: 'DELETE',
    headers: { 'x-auth-token': getCookie('x-auth-token') }
  })
  updateListActionToggle()
}

async function updateListName (name, boardId, lists, listId, updateListsState) {
  const newLists = lists.map(list => {
    if (list._id === listId) {
      list.listName = name
    }
    return list
  })
  updateListsState(newLists)
  await window.fetch(`board/${boardId}/${listId}/`, {
    method: 'PUT',
    body: JSON.stringify({ listName: name }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })
}

async function moveListFunction (
  fromBoardId,
  toBoardId,
  moveList,
  toIndex,
  boards,
  lists,
  updateListsState,
  updateListMoveToggle,
  updateListActionToggle,
  updateBoardsState
) {
  await deleteList(
    fromBoardId,
    lists,
    moveList,
    updateListsState,
    updateListActionToggle
  )

  const newBoards = boards.map(board => {
    if (board._id === fromBoardId) {
      const newLists = board.lists.filter(list => list._id !== moveList._id)
      board.lists = newLists
    }
    if (board._id === toBoardId) {
      board.lists.splice(toIndex, 0, moveList)
    }
    return board
  })
  updateBoardsState(newBoards)
  const board = newBoards.filter(board => {
    return board._id === fromBoardId
  })
  updateListsState(board[0].lists)
  updateListMoveToggle(false)
  createListAtIndex(toBoardId, moveList, toIndex)
}

export {
  createList,
  createListAtIndex,
  deleteList,
  updateListName,
  moveListFunction
}

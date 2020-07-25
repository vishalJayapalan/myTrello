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
  updateListsState([...lists, { listName, _id: jsonData.listId, cards: [] }])
  //   setLists([...lists, { listName, _id: jsonData.listId, cards: [] }])
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

// boardId,lists

async function updateListName (name, boardId, lists, listId, updateListsState) {
  //   const value = event.target.value
  const newLists = lists.map(list => {
    if (list._id === listId) {
      list.listName = name
    }
    return list
  })
  updateListsState(newLists)
  //   setLists(newLists)
  await window.fetch(`board/${boardId}/${listId}/`, {
    method: 'PUT',
    body: JSON.stringify({ listName: name }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })
}

export { createList, createListAtIndex, deleteList, updateListName }

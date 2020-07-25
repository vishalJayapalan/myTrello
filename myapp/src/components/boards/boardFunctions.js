// import { getCookie } from '../util/cookies'

async function fetchBoardsFunction (getCookie) {
  const data = await window.fetch('team/', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'x-auth-token': getCookie('x-auth-token')
    }
  })
  if (!(data.status >= 200 && data.status < 300)) {
    throw new Error(data.statusText)
  }
  const jsonData = await data.json()
  return { data, jsonData }
}

async function createBoardFunction (boardName, getCookie) {
  const response = await window.fetch('team/', {
    method: 'POST',
    body: JSON.stringify({ boardName }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })
  const { boardId } = await response.json() // changed here
  return boardId
}

async function deleteBoardFunction (
  boardId,
  getCookie,
  updateBoardDeletedState
) {
  //   const boardId = props.match.params.boardId
  await window.fetch(`${boardId}/`, {
    method: 'DELETE',
    headers: {
      'x-auth-token': getCookie('x-auth-token')
    }
  })
  //   setBoardDeleted(true)
  updateBoardDeletedState()
}
async function updateBoardFunction (
  boardId,
  name,
  value,
  getCookie,
  updateBoardState
) {
  //   setBoard({ ...board, [name]: value })
  await window.fetch(`${boardId}/`, {
    method: 'PUT',
    body: JSON.stringify({ name: name, value: value }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })
  updateBoardState(name, value)
}

async function leaveBoardFunction (
  boardId,
  user,
  getCookie,
  updateBoardState,
  updateBoardDeletedState
) {
  const data = await window.fetch(`team/${boardId}`, {
    method: 'PUT',
    body: JSON.stringify({ teamMemberId: user._id }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })
  const jsonData = await data.json()
  updateBoardState(jsonData)
  updateBoardDeletedState()
  // setBoard(jsonData)
  // setBoardDeleted(true)
}

export {
  fetchBoardsFunction,
  createBoardFunction,
  deleteBoardFunction,
  updateBoardFunction,
  leaveBoardFunction
}

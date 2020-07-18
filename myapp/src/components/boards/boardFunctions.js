// import { getCookie } from '../util/cookies'

async function fetchBoardsFunction (getCookie) {
  const data = await window.fetch('http://localhost:8000/', {
    method: 'GET',
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
  const response = await window.fetch('http://localhost:8000/', {
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
module.exports = { fetchBoardsFunction, createBoardFunction }

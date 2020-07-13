import React, { useState, useEffect } from 'react'
import Board from './board'
import Navbar from '../navbar/navbar.js'
import { Redirect } from 'react-router-dom'

export default function Boards (props) {
  const [logout, setLogout] = useState(false)
  const [boards, setBoards] = useState([])
  // const [user, setUser] = useState([])

  useEffect(() => {
    fetchBoards()
  }, [])

  async function fetchBoards () {
    await fetchUser()
    const data = await window.fetch('http://localhost:8000/', {
      method: 'GET',
      credencials: 'include',
      headers: {
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.status >= 200 && data.status < 300) {
      const jsonData = await data.json()
      setBoards(jsonData)
    } else {
      throw new Error(data.statusText)
    }
  }
  async function fetchUser () {
    try {
      const resp = await window.fetch('http://localhost:8000/user', {
        method: 'GET',
        credencials: 'include',
        headers: {
          'x-auth-token': getCookie('x-auth-token')
        }
      })
      const jsonResp = await resp.json()
      setLogout(false)
      return jsonResp
    } catch (err) {
      setLogout(true)
      return ''
    }
  }

  function getCookie (cookieName) {
    const name = cookieName + '='
    const cookies = document.cookie.split(';')
    for (let index = 0; index < cookies.length; index++) {
      const cookie = cookies[index].trim()
      if (cookie.startsWith(name)) {
        return cookie.slice(name.length, cookie.length)
      }
    }
    return ''
  }

  async function createBoard (event) {
    const boardName = event.target.value
    event.target.value = ''
    const response = await window.fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify({ boardName: boardName }),
      // credencials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    const jsonData = await response.json()
    const boardId = jsonData.boardId

    setBoards([...boards, { _id: boardId, boardName, lists: [] }])
  }
  // console.log(boards)
  return logout ? (
    <Redirect to='/login' />
  ) : (
    <div className='boardsPage'>
      <Navbar />
      <div className='boardsContainer'>
        {boards.map(board => (
          <Board key={board._id} board={board} />
        ))}
        <div className='newBoard'>
          <input
            className='createNewBoard'
            onKeyUp={event => {
              if (event.target.value && event.keyCode === 13) {
                return createBoard(event)
              }
            }}
            placeholder='Create New Board'
          />
        </div>
      </div>
    </div>
  )
}

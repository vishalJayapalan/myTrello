import React, { useState, useEffect } from 'react'
import Board from './board'
import Navbar from '../navbar/navbar.js'
import { Redirect } from 'react-router-dom'
import { getCookie } from '../util/cookies'
import { fetchBoardsFunction, createBoardFunction } from './boardFunctions'

export default function Boards (props) {
  const [logout, setLogout] = useState(false)
  const [boards, setBoards] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    fetchBoards()
  }, [])

  async function fetchBoards () {
    try {
      const { data, jsonData } = await fetchBoardsFunction(getCookie)
      // console.log(data.ok)
      if (!data.ok) {
        throw new Error(data.statusText)
      }
      setUser(jsonData.user)
      setBoards(jsonData.boards)
    } catch (err) {
      setLogout(true)
    }
  }

  async function createBoard (event) {
    const boardName = event.target.value
    event.target.value = ''
    const boardId = await createBoardFunction(boardName, getCookie)
    setBoards([...boards, { _id: boardId, boardName, lists: [] }])
  }

  return logout ? (
    <Redirect to='/login' />
  ) : (
    <div className='boardsPage'>
      <Navbar user={user} />
      <div className='boardsContainer'>
        {boards.map(board => (
          <Board key={board._id} board={board} />
        ))}
        <div className='newBoard'>
          <input
            className='createNewBoard'
            onKeyUp={event => {
              event.target.value && event.keyCode === 13 && createBoard(event)
            }}
            placeholder='Create New Board'
          />
        </div>
      </div>
    </div>
  )
}

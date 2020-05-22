import React, { useState, useEffect } from 'react'
import Board from './board'

export default function Boards (props) {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    fetchBoards()
  }, [])

  async function fetchBoards () {
    const data = await window.fetch('http://localhost:8000/')
    const jsonData = await data.json()
    setBoards(jsonData)
  }

  async function createBoard (event) {
    const boardName = event.target.value
    event.target.value = ''
    const response = await window.fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify({ boardName: boardName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json()
    const boardId = jsonData.boardId

    setBoards([...boards, { _id: boardId, boardName, lists: [] }])
  }

  return (
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
  )
}

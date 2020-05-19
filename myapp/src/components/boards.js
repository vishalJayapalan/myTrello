import React, { useState, useEffect } from 'react'
import Board from './board'

export default function Boards (props) {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    fetchBoards()
  }, [boards])

  async function fetchBoards () {
    const data = await window.fetch('http://localhost:8000/')
    const jsonData = await data.json()
    setBoards(jsonData)
    // console.log(boards)
  }

  // function boardShower (board) {
  //   return <Board key={board._id} board={board} />
  // }

  return (
    <div className='boardcontainer'>
      {boards.map(board => (
        <Board key={board._id} board={board} />
      ))}
      {/* <Board props={boards}></Board> */}
      <div className='newBoard'>
        <p>Create New Board...</p>
      </div>
    </div>
  )
}

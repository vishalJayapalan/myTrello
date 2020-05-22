import React from 'react'
import { Link } from 'react-router-dom'

export default function Board (props) {
  return (
    <Link style={{ textDecoration: 'none' }} to={`/lists/${props.board._id}`}>
      <div className='boardContainer'>
        <p className='boardName'>{props.board.boardName}</p>
      </div>
    </Link>
  )
}

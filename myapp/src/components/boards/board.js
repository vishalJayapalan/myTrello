import React from 'react'
import { Link } from 'react-router-dom'

export default function Board ({ board }) {
  return (
    <Link style={{ textDecoration: 'none' }} to={`/${board._id}`}>
      <div className='boardContainer'>
        <p className='boardName'>{board.boardName}</p>
      </div>
    </Link>
  )
}

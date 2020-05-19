import React from 'react'
import { Link } from 'react-router-dom'

export default function Board (props) {
  // console.log(props)
  return (
    <Link to={`/lists/${props.board._id}`}>
      <div className='boardBox'>
        <p>{props.board.boardName}</p>
      </div>
    </Link>
  )
}

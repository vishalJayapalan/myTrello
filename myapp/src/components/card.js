import React from 'react'

export default function card (props) {
  return (
    <p
      className='card draggable'
      onDragStart={props.handleDragStart}
      onDragEnd={props.handleDragEnd}
      draggable='true'
    >
      {props.card.cardName}
    </p>
  )
}

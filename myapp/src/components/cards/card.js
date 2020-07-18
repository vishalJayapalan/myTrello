import React from 'react'
import { dragStartCardFunction, dragEndCardFunction } from './dragCard'

export default function card (props) {
  return (
    <p
      className='card draggable'
      id={props.card._id}
      onDragStart={e => dragStartCardFunction(e, props.card, props.listId)}
      onDragEnd={e => dragEndCardFunction(e)}
      draggable='true'
      onClick={e => props.displayCardFunction(e, props.card, props.list)}
    >
      {props.card.cardName}
      <i
        className='fas fa-edit'
        onClick={e => props.cardEditFunction(e, props.card, props.list)}
      />
    </p>
  )
}

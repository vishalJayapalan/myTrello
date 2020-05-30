import React from 'react'

export default function card (props) {
  return (
    <p
      className='card draggable'
      id={props.card._id}
      onDragStart={e =>
        props.dragStart(e, props.card._id, props.card.cardName, props.listId)
      }
      onDragEnd={e => props.dragEnd(e)}
      draggable='true'
    >
      {props.card.cardName}
      <i className='fas fa-edit' />
    </p>
  )
}

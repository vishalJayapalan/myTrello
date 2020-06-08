import React from 'react'

export default function card (props) {
  // console.log(props.card)
  return (
    <p
      className='card draggable'
      id={props.card._id}
      onDragStart={e =>
        props.dragStart(e, props.card._id, props.card.cardName, props.listId)
      }
      onDragEnd={e => props.dragEnd(e)}
      draggable='true'
      onClick={e =>
        props.displayCardFunction(e, props.card.cardName, props.list)
      }
    >
      {props.card.cardName}
      <i className='fas fa-edit' onClick={e => props.cardEditFunction(e)} />
    </p>
  )
}

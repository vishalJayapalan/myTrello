import React from 'react'
import {
  dragStartCardFunction,
  dragEndCardFunction,
  dragOverCardFunction,
  dropCardFunction,
  dragCardLeaveFunction
} from './dragCard'
export default function card (props) {
  return (
    <p
      className='card'
      id={props.card._id}
      onDragStart={e =>
        dragStartCardFunction(
          e,
          props.card,
          props.listId,
          props.dragCardToggler
        )
      }
      onDragEnd={e => {
        props.dragCard && dragEndCardFunction(e, props.dragCardToggler)
      }}
      onDragOver={e => props.dragCard && dragOverCardFunction(e)}
      onDrop={e => {
        props.dragCard &&
          dropCardFunction(
            e,
            props.boardId,
            props.lists,
            props.list._id,
            props.updateListsState
          )
      }}
      onDragLeave={e => props.dragCard && dragCardLeaveFunction(e)}
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

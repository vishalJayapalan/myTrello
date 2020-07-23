import React from 'react'
import {
  dragStartCardFunction,
  dragEndCardFunction,
  dragOverCardFunction,
  dropCardFunction,
  // handleDropCard,
  dragCardLeaveFunction
} from './dragCard'
// import { getCookie } from '../util/cookies'
// import { deleteCardFunction, createCardAtIndexFunction } from './cardFunctions'

export default function card (props) {
  // async function handleDropCard (event, listId) {
  //   event.persist()
  //   const boardId = props.boardId
  //   const prevListId = event.dataTransfer.getData('prevListId')
  //   const moveCard = JSON.parse(event.dataTransfer.getData('card'))
  //   await deleteCardFunction(
  //     boardId,
  //     props.lists,
  //     prevListId,
  //     moveCard._id,
  //     getCookie,
  //     props.updateListsState
  //   )
  //   const { newLists, cardIndex } = dropCardFunction(
  //     event,
  //     listId,
  //     props.lists,
  //     moveCard
  //   )
  //   // setLists(newLists)
  //   props.updateListsState(newLists)
  //   await createCardAtIndexFunction(
  //     boardId,
  //     listId,
  //     cardIndex,
  //     moveCard,
  //     getCookie
  //   )
  // }
  return (
    <p
      className='card'
      id={props.card._id}
      onDragStart={e => dragStartCardFunction(e, props.card, props.listId)}
      onDragEnd={e => dragEndCardFunction(e)}
      onDragOver={e => dragOverCardFunction(e)}
      onDrop={e => {
        dropCardFunction(
          e,
          props.boardId,
          props.lists,
          props.list._id,
          props.updateListsState
        )
      }}
      onDragLeave={e => dragCardLeaveFunction(e)}
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

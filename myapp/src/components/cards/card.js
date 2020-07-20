import React from 'react'
import {
  dragStartCardFunction,
  dragEndCardFunction,
  dragOverCardFunction,
  dropCardFunction,
  dragLeaveFunction
} from './dragCard'
import { getCookie } from '../util/cookies'
import { deleteCardFunction, createCardAtIndexFunction } from './cardFunctions'

export default function card (props) {
  async function handleDropCard (event, listId) {
    event.persist()
    const boardId = props.boardId
    const prevListId = event.dataTransfer.getData('prevListId')
    const moveCard = JSON.parse(event.dataTransfer.getData('card'))
    await deleteCardFunction(
      boardId,
      props.lists,
      prevListId,
      moveCard._id,
      getCookie,
      props.updateListState
    )
    const { newLists, cardIndex } = dropCardFunction(
      event,
      listId,
      props.lists,
      moveCard
    )
    // setLists(newLists)
    props.updateListState(newLists)
    await createCardAtIndexFunction(
      boardId,
      listId,
      cardIndex,
      moveCard,
      getCookie
    )
  }
  return (
    <p
      className='card draggable'
      id={props.card._id}
      onDragStart={e => dragStartCardFunction(e, props.card, props.listId)}
      onDragEnd={e => dragEndCardFunction(e)}
      onDragOver={e => dragOverCardFunction(e)}
      onDrop={e => {
        handleDropCard(e, props.list._id)
      }}
      onDragLeave={e => dragLeaveFunction(e)}
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

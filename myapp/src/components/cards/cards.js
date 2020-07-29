import React from 'react'
import Card from './card'
import { getCookie } from '../util/cookies'
import { createCardFunction } from './cardFunctions'
import {
  dragOverCardFunction,
  dropCardFunction,
  dragEndCardFunction,
  dragCardLeaveFunction
} from './dragCard'

export default function Cards (props) {
  return (
    <div>
      <div className='cardsContainer'>
        {props.list.cards.map(card => (
          <Card
            displayCardFunction={props.displayCardFunction}
            cardEditFunction={props.cardEditFunction}
            key={card._id}
            listId={props.list._id}
            card={card}
            list={props.list}
            lists={props.lists}
            boardId={props.boardId}
            updateListsState={props.updateListsState}
            dragCard={props.dragCard}
            dragCardToggler={props.dragCardToggler}
          />
        ))}
        <input
          className='newCardInput'
          onDragOver={e => props.dragCard && dragOverCardFunction(e)}
          onDragEnd={e => {
            props.dragCard && dragEndCardFunction(e, props.dragCardToggler)
          }}
          onDragLeave={e => props.dragCard && dragCardLeaveFunction(e)}
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
          onKeyUp={e => {
            if (e.target.value && e.keyCode === 13) {
              return createCardFunction(
                e,
                props.boardId,
                props.lists,
                props.list._id,
                getCookie,
                props.updateListsState
              )
            }
          }}
          placeholder='+ Add New Card....'
        />
      </div>
    </div>
  )
}

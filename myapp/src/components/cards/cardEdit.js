import React, { useState } from 'react'
import { getCookie } from '../util/cookies'
import { updateCardFunction, deleteCardFunction } from './cardFunctions'
export default function CardEdit (props) {
  const [cardName, setCardName] = useState(props.card.cardName)
  function updateNExitCardEdit (event, cardName, listId, cardId) {
    event.stopPropagation()
    updateCardFunction(
      props.boardId,
      props.lists,
      'cardName',
      cardName,
      listId,
      cardId,
      getCookie,
      props.updateListsState
    )
    props.exitCardEdit(event)
  }
  return (
    <div
      className='overlay'
      onClick={e => {
        if (e.target.className === 'overlay') {
          props.closeCardEditAndDetail()
        }
      }}
    >
      <div
        className='cardEditContainer'
        style={{
          marginTop: props.cardEditShow ? `${props.cardPosition.y}px` : '0px',
          marginLeft: props.cardEditShow ? `${props.cardPosition.x}px` : '0px'
        }}
      >
        <div className='cardEditTextarea'>
          <textarea
            value={cardName}
            onChange={e => setCardName(e.target.value)}
          />
        </div>
        <button
          className='cardEditSaveBtn'
          onClick={e =>
            updateNExitCardEdit(e, cardName, props.list._id, props.card._id)
          }
        >
          Save
        </button>
        <div className='cardEditButtons'>
          <a onClick={e => props.openMoveCard(e)}>Move</a>
          <a onClick={e => props.copyCardToggler(e)}>Copy</a>
          <a>Change Due Date</a>
          <a
            onClick={e => {
              deleteCardFunction(
                props.boardId,
                props.lists,
                props.list._id,
                props.card._id,
                getCookie,
                props.updateListsState
              )
              props.exitCardEdit(e)
            }}
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { getCookie } from '../util/cookies'
import { updateCardFunction, deleteCardFunction } from './cardFunctions'
export default function CardEdit (props) {
  const [cardName, setCardName] = useState('')
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
      props.updateListState
    )
    // setCardEditToggle(false)
    props.exitCardEdit(event)
  }
  return (
    <div
      className='overlay'
      // style={{ display: props.cardEditShow ? 'block' : 'none' }}
      onClick={e => {
        if (e.target.className === 'overlay') {
          props.closeCardEditAndDetail()
          // props.exitCardEdit(e)
          // props.closeMoveCard(e)
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
            defaultValue={props.card.cardName}
            onChange={e => setCardName(e.target.value)}
            // onKeyUp={e => props.editCardName(e)}
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
          {/* <a>Change Members</a> */}
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
                props.updateListState
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

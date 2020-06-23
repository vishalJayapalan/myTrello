import React from 'react'

export default function CardEdit (props) {
  return (
    <div
      className='overlay'
      style={{ display: props.cardEditShow ? 'block' : 'none' }}
      onClick={e => {
        if (e.target.className === 'overlay') props.exitCardEdit(e)
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
            // onKeyUp={e => props.editCardName(e)}
          />
        </div>
        <button
          className='cardEditSaveBtn'
          onClick={e => props.updateNExitCardEdit(e)}
        >
          Save
        </button>
        <div className='cardEditButtons'>
          <a>Change Members</a>
          <a>Move</a>
          <a>Copy</a>
          <a>Change Due Date</a>
          <a
            onClick={e => {
              props.deleteCard(props.boardId, props.list._id, props.card._id)
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
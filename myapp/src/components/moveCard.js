import React, { useState } from 'react'

export default function MoveCard (props) {
  const [inPosition, setPosition] = useState(0)
  return (
    <div
      className='moveCardContainer'
      style={{
        display: props.cardMoveShow ? ' block' : ' none',
        marginTop: props.cardMoveShow ? `${props.moveCardPosition.y}px` : '0px',
        marginLeft: props.cardMoveShow ? `${props.moveCardPosition.x}px` : '0px'
      }}
    >
      <div className='moveCardTitleContainer'>
        <span className='moveCardTitle'>MoveCard</span>
        <i
          className='fas fa-times closeCardDetail'
          onClick={() => props.closeMoveCard()}
        />
      </div>
      <hr />
      <div className='moveCard moveCardBoard'>
        <label>Board</label>
        <select onChange={e => props.changeInBoard(e)}>
          {props.boards.map(board => (
            <option key={board._id} id={board.id}>
              {board.boardName}
            </option>
          ))}
        </select>
      </div>
      <div className='moveCard moveCardList'>
        <label>List</label>
        <select onChange={e => props.changeInList(e)}>
          {props.inBoard.length &&
            props.inBoard[0].lists.map(list => (
              <option key={list._id} id={list._id}>
                {list.listName}
              </option>
            ))}
        </select>
      </div>
      <div className='moveCard moveCardPosition'>
        <label>Position</label>
        <select onChange={e => setPosition(e.target.value)}>
          {props.inBoard.length &&
            props.inList[0].cards.map(card => (
              <option key={card._id + '1'}>
                {props.inList[0].cards.indexOf(card)}
              </option>
            ))}
        </select>
      </div>
      <button
        className='moveCardBtn'
        onClick={() =>
          props.onMoveCard(
            props.boardId,
            props.inBoard[0]._id,
            props.list._id,
            props.inList[0]._id,
            props.card,
            inPosition
          )
        }
      >
        Move
      </button>
    </div>
  )
}

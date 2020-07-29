import React, { useState } from 'react'
import { getCookie } from '../util/cookies'
import { deleteCardFunction, createCardAtIndexFunction } from './cardFunctions'

export default function MoveCard (props) {
  const [inPosition, setPosition] = useState(0)
  async function handleMoveCard (
    fromBoardId,
    toBoardId,
    fromListId,
    toListId,
    card,
    toIndex = 0
  ) {
    const cardId = card._id
    await deleteCardFunction(
      fromBoardId,
      props.lists,
      fromListId,
      cardId,
      getCookie,
      props.updateListsState
    )
    const newLists = props.lists.map(list => {
      if (list._id === toListId) {
        list.cards.splice(toIndex, 0, card)
      }
      return list
    })
    props.updateListsState(newLists)
    await createCardAtIndexFunction(
      toBoardId,
      toListId,
      toIndex,
      card,
      getCookie
    )
    props.closeCardEditAndDetail()
  }

  return (
    <div
      className='moveCardPage'
      onClick={e =>
        e.target.className === 'moveCardPage' && props.closeMoveCard(e)
      }
    >
      <div
        className='moveCardContainer'
        style={{
          marginTop: `${props.moveOrCopyCardPosition.y}px`,
          marginLeft: `${props.moveOrCopyCardPosition.x}px`
        }}
      >
        <div className='moveCardTitleContainer'>
          <span className='moveCardTitle'>MoveCard</span>
          <i
            className='fas fa-times closeMoveCard'
            onClick={() => props.closeMoveCard()}
          />
        </div>
        <hr />
        <div className='moveCard moveCardBoard'>
          <label>Board</label>
          <select
            onChange={e => {
              props.changeInBoard(e)
            }}
            value={props.inBoard.boardName}
          >
            {props.boards.map(board => (
              <option key={board._id} id={board.id}>
                {board.boardName}
              </option>
            ))}
          </select>
        </div>
        <div className='moveCard moveCardList'>
          <label>List</label>
          <select
            onChange={e => props.changeInList(e)}
            value={props.inList[0].listName}
          >
            {props.inBoard.lists.map(list => (
              <option key={list._id} id={list._id}>
                {list.listName}
              </option>
            ))}
          </select>
        </div>
        <div className='moveCard moveCardPosition'>
          <label>Position</label>
          <select onChange={e => setPosition(e.target.value)}>
            {props.inList[0].cards.map(card => (
              <option key={card._id + '1'}>
                {props.inList[0].cards.indexOf(card)}
              </option>
            ))}
          </select>
        </div>
        <button
          className='moveCardBtn'
          onClick={() =>
            handleMoveCard(
              props.boardId,
              props.inBoard._id,
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
    </div>
  )
}

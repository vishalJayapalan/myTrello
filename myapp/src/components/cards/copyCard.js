import React, { useState } from 'react'
import { getCookie } from '../util/cookies'
import { createCardAtIndexFunction } from './cardFunctions'

export default function CopyCard (props) {
  const [inPosition, setPosition] = useState(0)
  const [newCardName, setNewCardName] = useState(props.card.cardName)

  async function handleCopyCard (
    // fromBoardId,
    toBoardId,
    // fromListId,
    toListId,
    card,
    toIndex = 0
  ) {
    const copyCard = { ...card }
    delete copyCard._id
    copyCard.cardName = newCardName
    const newLists = props.lists.map(list => {
      if (list._id === toListId) {
        list.cards.splice(toIndex, 0, copyCard)
      }
      return list
    })
    props.updateListsState(newLists)
    await createCardAtIndexFunction(
      toBoardId,
      toListId,
      toIndex,
      copyCard,
      getCookie
    )
    props.closeCardEditAndDetail()
  }

  // cardCopyShow, copyCardPosition
  return (
    <div
      className='copyCardPage'
      onClick={e =>
        e.target.className === 'copyCardPage' && props.copyCardToggler(e)
      }
    >
      <div
        className='copyCardContainer'
        style={{
          marginTop: `${props.moveOrCopyCardPosition.y}px`,
          marginLeft: `${props.moveOrCopyCardPosition.x}px`
        }}
      >
        <div className='copyCardTitleContainer'>
          <span className='copyCardTitle'>CopyCard</span>
          <i
            className='fas fa-times closeCopyCard'
            onClick={e => props.copyCardToggler(e)}
          />
        </div>
        <hr />

        <div className='copyCard copyCardBoard'>
          <label>Title</label>
          <textarea
            className='copyCardName'
            value={newCardName}
            onChange={e => setNewCardName(e.target.value)}
          />
        </div>
        <label>Copy to.....</label>
        <div className='copyCard copyCardBoard'>
          <label>Board</label>
          <select
            className='copyCardSelect'
            onChange={e => {
              props.changeInBoard(e)
            }}
            value={props.inBoard[0].boardName}
          >
            {props.boards.map(board => (
              <option key={board._id} id={board.id}>
                {board.boardName}
              </option>
            ))}
          </select>
        </div>
        <div className='copyCard copyCardList'>
          <label>List</label>
          <select
            className='copyCardSelect'
            onChange={e => props.changeInList(e)}
            value={props.inList[0].listName}
          >
            {props.inBoard.length &&
              props.inBoard[0].lists.map(list => (
                <option key={list._id} id={list._id}>
                  {list.listName}
                </option>
              ))}
          </select>
        </div>
        <div className='copyCard copyCardPosition'>
          <label>Position</label>
          <select
            className='copyCardSelect'
            onChange={e => setPosition(e.target.value)}
          >
            {props.inBoard.length &&
              props.inList[0].cards.map(card => (
                <option key={card._id + '1'}>
                  {props.inList[0].cards.indexOf(card)}
                </option>
              ))}
          </select>
        </div>
        <button
          className='copyCardBtn'
          onClick={() =>
            // props.onMoveCard(
            handleCopyCard(
              //   props.boardId,
              props.inBoard[0]._id,
              //   props.list._id,
              props.inList[0]._id,
              props.card,
              inPosition
            )
          }
        >
          Copy
        </button>
      </div>
    </div>
  )
}

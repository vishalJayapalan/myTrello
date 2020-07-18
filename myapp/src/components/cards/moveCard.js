import React, { useState } from 'react'

export default function MoveCard (props) {
  // console.log(props)
  // const [boardName, setBoardName] = useState(props.boardName)
  // const [listName, setListName] = useState(props.list.listName)
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
    // console.log('before', lists)
    await deleteCard(fromBoardId, fromListId, cardId)
    // console.log('after', lists)
    const newLists = lists.map(list => {
      if (list._id === toListId) {
        list.cards.splice(toIndex, 0, card)
      }
      return list
    })
    props.updateListState(newLists)
    // setLists(newLists)
    await createCardAtIndex(toBoardId, toListId, toIndex, card)
    closeMoveCard()
    setCardDetailToggle(false)
    setCardEditToggle(false)
  }

  return (
    <div
      className='moveCardContainer'
      style={{
        // display: props.cardMoveShow ? ' block' : ' none',
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
        <select
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
      <div className='moveCard moveCardList'>
        <label>List</label>
        <select
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
          // props.onMoveCard(
          handleMoveCard(
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
// fromboardId,toBoardId,fromListId,toListId,card,toIndex

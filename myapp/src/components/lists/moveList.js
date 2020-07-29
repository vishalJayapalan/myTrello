import React, { useState } from 'react'
import { moveListFunction } from './listFunctions'

export default function MoveList (props) {
  const [boardName, setBoardName] = useState(props.board.boardName)
  const [inPosition, setPosition] = useState(0)
  return (
    <div
      className='moveListPage'
      onClick={e =>
        e.target.className === 'moveListPage' && props.closeMoveList(e)
      }
    >
      <div
        className='moveListContainer'
        style={{
          marginTop: props.listMoveShow ? `${props.listPosition.y}px` : '0px',
          marginLeft: props.listMoveShow ? `${props.listPosition.x}px` : '0px'
        }}
      >
        <div className='moveListTitleContainer'>
          <span className='moveCardTitle'>MoveList</span>
          <i
            className='fas fa-times closeCardDetail'
            onClick={() => props.closeMoveList()}
          />
        </div>
        <hr />
        <div className='moveList moveListBoard'>
          <label>Board</label>
          <select
            value={boardName}
            onChange={e => {
              setBoardName(e.target.value)
              props.changeToBoard(e.target.value)
            }}
          >
            {props.boards.map(board => (
              <option key={board._id} id={board._id}>
                {board.boardName}
              </option>
            ))}
          </select>
        </div>
        <div className='moveList moveListPosition'>
          <label>Position</label>
          <select onChange={e => setPosition(e.target.value)}>
            {props.toBoard.length &&
              props.toBoard[0].lists.map(list => (
                <option key={list._id + '1'}>
                  {props.toBoard[0].lists.indexOf(list)}
                </option>
              ))}
          </select>
        </div>
        <button
          className='moveListBtn'
          onClick={() =>
            moveListFunction(
              props.boardId,
              props.toBoard[0]._id,
              props.list,
              inPosition,
              props.boards,
              props.lists,
              props.updateListsState,
              props.updateListMoveToggle,
              props.updateListActionToggle,
              props.updateBoardsState
            )
          }
        >
          Move
        </button>
      </div>
    </div>
  )
}

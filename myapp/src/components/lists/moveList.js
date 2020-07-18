import React, { useState } from 'react'

export default function MoveList (props) {
  // listMoveSHow moveListPosition closeMoveListChangeInBoard boards
  const [boardName, setBoardName] = useState(props.board.boardName)
  const [inPosition, setPosition] = useState(0)
  // console.log(boardName)
  return (
    <div
      className='moveListContainer'
      style={{
        // display: props.listMoveShow ? ' block' : ' none',
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
          // defaultValue={props.boardName}
        >
          {props.boards.map(board => (
            <option
              key={board._id}
              id={board._id}
              // selected={board._id === props.boardId}
            >
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
          props.onMoveList(
            props.boardId,
            props.toBoard[0]._id,
            // props.list._id,
            // props.inList[0]._id,
            // props.card,
            props.list,
            inPosition
          )
        }
      >
        Move
      </button>
    </div>
  )
}

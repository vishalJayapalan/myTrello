import React from 'react'
import { deleteList } from './listFunctions'

export default function ListActions (props) {
  const {
    boardId,
    lists,
    list,
    updateListsState,
    updateListActionToggle
  } = props
  return (
    <div
      className='listActionsPage'
      onClick={e =>
        e.target.className === 'listActionsPage' && props.closeListActions(e)
      }
    >
      <div
        className='listActionsContainer'
        style={{
          marginTop: `${props.listPosition.y}px`,
          marginLeft: `${props.listPosition.x}px`
        }}
      >
        <div className='listActionTitleContainer'>
          <span className='listActionTitle'>List Actions</span>
          <i
            className='fas fa-times closeListActions'
            onClick={e => props.closeListActions(e)}
          />
        </div>
        <hr />
        <div className='listActionsContents'>
          <p className='listActionContent' onClick={() => props.openMoveList()}>
            Move List
          </p>
          <p
            className='listActionContent'
            onClick={() =>
              deleteList(
                boardId,
                lists,
                list,
                updateListsState,
                updateListActionToggle
              )
            }
          >
            DeleteList
          </p>
        </div>
      </div>
    </div>
  )
}

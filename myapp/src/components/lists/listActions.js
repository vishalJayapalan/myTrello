import React from 'react'

export default function ListActions (props) {
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
          {/* <p>Add Card...</p> */}
          {/* <p>Copy List</p> */}
          <p className='listActionContent' onClick={() => props.openMoveList()}>
            Move List
          </p>
          <p className='listActionContent' onClick={() => props.deleteList()}>
            DeleteList
          </p>
        </div>
      </div>
    </div>
  )
}

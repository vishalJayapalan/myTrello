import React from 'react'

export default function ListActions (props) {
  return (
    // <div
    //   className='overlay'
    //   style={{ display: props.listActionShow ? ' block' : ' none' }}
    // >
    <div
      className='listActionsContainer'
      style={{
        display: props.listActionShow ? ' block' : ' none',
        marginTop: props.listActionShow ? `${props.listPosition.y}px` : '0px',
        marginLeft: props.listActionShow ? `${props.listPosition.x}px` : '0px'
      }}
    >
      <div className='listActionTitleContainer'>
        <span className='listActionTitle'>List Actions</span>
        <i
          className='fas fa-times closeCardDetail'
          onClick={() => props.closeListActions()}
        />
      </div>
      <hr />
      <div>
        <p>Add Card...</p>
        <p>Copy List</p>
        <p>Move List</p>
        <p onClick={() => props.deleteList()}>DeleteList</p>
      </div>
    </div>
    // </div>
  )
}
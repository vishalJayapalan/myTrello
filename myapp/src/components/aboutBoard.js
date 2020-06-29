import React from 'react'

export default function AboutBoard (props) {
  return (
    <div className='aboutBoardContainer'>
      <div>
        <i className='fas fa-chevron-left' onClick={() => props.showMenu()} />
        <h3>About this board</h3>
        <i
          className='fas fa-times closeCardDetail'
          onClick={() => props.closeAboutAndShowMenu()}
        />
      </div>
      <hr />
      <div className='userInfoInBoard'>
        <span>Made By</span>
        <p>vj@gmail.com</p>
      </div>
      <div className='boardDescription'>
        <label>Description</label>
        <textarea placeholder="Its's your boards time to shine! let people know what this board is used for and what they can expect to see." />
      </div>
    </div>
  )
}

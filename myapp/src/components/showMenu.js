import React from 'react'

export default function ShowMenu (props) {
  return (
    <div
      className='showMenuContainer'
      style={{ display: props.showMenuToggle ? 'block' : 'none' }}
    >
      <div className='menuTitleContainer'>
        <h3 className='menuTitle'>Menu</h3>
        <i
          className='fas fa-times closeCardDetail'
          onClick={() => props.closeShowMenu()}
        />
      </div>
      <hr />
      <div className='menus'>
        <p className='menu' onClick={() => props.showAboutBoard()}>
          About this Board
        </p>
        <p className='menu'>Copy Board</p>
        <p className='menu' onClick={() => props.deleteBoard()}>
          delete this board
        </p>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import AboutBoard from './aboutBoard'

export default function ShowMenu (props) {
  const [showAboutBoardToggle, setShowAboutBoardToggle] = useState(false)

  function aboutBoardToggler () {
    setShowAboutBoardToggle(!showAboutBoardToggle)
    console.log(showAboutBoardToggle)
  }
  function closeAboutAndShowMenu () {
    aboutBoardToggler()
    props.showMenuToggler()
  }
  return (
    <div className='aboutAndShowMenuContainer'>
      <div
        className='showMenuContainer'
        // style={{ display: props.showMenuToggle ? 'block' : 'none' }}
      >
        <div className='menuTitleContainer'>
          <h3 className='menuTitle'>Menu</h3>
          <i
            className='fas fa-times closeCardDetail'
            onClick={() => props.showMenuToggler()}
          />
        </div>
        <hr />
        <div className='menus'>
          <p className='menu' onClick={() => aboutBoardToggler()}>
            About this Board
          </p>
          {/* <p className='menu'>Copy Board</p> */}
          {props.user._id === props.board.adminUser ? (
            <p className='menu' onClick={() => props.deleteBoard()}>
              delete this board
            </p>
          ) : (
            <p className='menu' onClick={() => props.leaveBoard()}>
              leave this board
            </p>
          )}
        </div>
      </div>
      {showAboutBoardToggle && (
        <AboutBoard
          board={props.board}
          user={props.user}
          closeAboutAndShowMenu={closeAboutAndShowMenu}
          showAboutBoardToggle={showAboutBoardToggle}
          closeAboutBoard={aboutBoardToggler}
          updateBoard={props.updateBoard}
        />
      )}
    </div>
  )
}

import React, { useState } from 'react'
import AboutBoard from './aboutBoard'
import {
  deleteBoardFunction,
  leaveBoardFunction
} from '../boards/boardFunctions'
import { getCookie } from '../util/cookies'

export default function ShowMenu (props) {
  const [showAboutBoardToggle, setShowAboutBoardToggle] = useState(false)

  function aboutBoardToggler () {
    setShowAboutBoardToggle(!showAboutBoardToggle)
  }
  function closeAboutAndShowMenu () {
    aboutBoardToggler()
    props.showMenuToggler()
  }
  return (
    <div className='aboutAndShowMenuContainer'>
      <div className='showMenuContainer'>
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
          {props.user._id === props.board.adminUser ? (
            <p
              className='menu'
              onClick={() =>
                deleteBoardFunction(
                  props.board._id,
                  getCookie,
                  props.updateBoardDeletedState
                )
              }
            >
              delete this board
            </p>
          ) : (
            <p
              className='menu'
              onClick={() =>
                leaveBoardFunction(
                  props.board._id,
                  props.user,
                  getCookie,
                  props.updateBoardState,
                  props.updateBoardDeletedState
                )
              }
            >
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
          updateBoardState={props.updateBoardState}
        />
      )}
    </div>
  )
}

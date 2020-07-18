import React from 'react'
import { getCookie } from '../util/cookies'
import { updateBoardFunction } from '../boards/boardFunctions'

export default function AboutBoard (props) {
  return (
    <div
      className='aboutBoardContainer'
      style={{ display: props.showAboutBoardToggle ? 'block' : 'none' }}
    >
      <div className='aboutBoardTitleContainer'>
        <i
          className='fas fa-chevron-left closeAboutBoard'
          onClick={() => props.closeAboutBoard()}
        />
        <h3>About this board</h3>
        <i
          className='fas fa-times closeCardDetail'
          onClick={() => props.closeAboutAndShowMenu()}
        />
      </div>
      <hr />
      <div className='aboutBoard'>
        <div className='userInfoInBoard'>
          <span>Made By</span>
          <p>
            <i className='fas fa-user' />
            {props.user.userName}
          </p>
        </div>
        <div className='boardDescriptionContainer'>
          <label>Description</label>
          <textarea
            className='boardDescription'
            defaultValue={props.board.description}
            placeholder="Its's your boards time to shine! let people know what this board is used for and what they can expect to see."
            onChange={event =>
              updateBoardFunction(
                props.board._id,
                'description',
                event.target.value,
                getCookie,
                props.updateBoardState
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

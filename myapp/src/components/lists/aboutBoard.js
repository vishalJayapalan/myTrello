import React, { useEffect, useState } from 'react'
import { getCookie } from '../util/cookies'
import { updateBoardFunction } from '../boards/boardFunctions'

export default function AboutBoard (props) {
  const [adminUser, setAdminUser] = useState('')
  useEffect(() => {
    getAdminDetails()
  }, [])

  async function getAdminDetails () {
    const response = await window.fetch('user/all')
    const allUsers = await response.json()
    // console.log(props)
    const adminUser = allUsers.filter(
      user => user._id === props.board.adminUser
    )
    // console.log(adminUser)
    setAdminUser(adminUser[0].userName)
  }

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
            {adminUser}
            {/* {props.user.userName} */}
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

import React, { useState } from 'react'
import { addTeamMemberFunction } from '../users/userFunctions'
import { getCookie } from '../util/cookies'

export default function InviteToBoard (props) {
  const [search, setSearch] = useState('')
  let searchUsers = []
  if (search) {
    searchUsers = props.users.filter(
      user =>
        (user.userName.includes(search.toLowerCase()) ||
          user.userName.includes(search.toUpperCase())) &&
        !props.team.includes(user._id)
    )
  }

  return (
    <div
      className='inviteToBoardPage'
      onClick={e =>
        e.target.className === 'inviteToBoardPage' &&
        props.closeInviteToBoard(e)
      }
    >
      <div
        className='inviteToBoardContainer'
        style={{
          marginTop: `${props.usersPosition.y + 30}px`,
          marginLeft: `${props.usersPosition.x}px`
        }}
      >
        <div className='inviteToBoardTitleContainer'>
          <span>Invite To Board</span>
          <i
            className='fas fa-times closeInviteToBoard'
            onClick={() => props.closeInviteToBoard()}
          />
        </div>
        <hr />
        <div>
          <input
            className='inviteToBoardInput'
            onChange={e => setSearch(e.target.value)}
            placeholder='userName'
          />
          <div>
            {searchUsers.map(user => (
              <p
                className='inviteToBoardMember'
                key={user._id}
                id={user._id}
                onClick={e => {
                  addTeamMemberFunction(
                    e,
                    props.board._id,
                    getCookie,
                    props.updateBoardState
                  )
                }}
              >
                {user.userName}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

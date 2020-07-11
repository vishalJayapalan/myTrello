import React, { useState } from 'react'

export default function InviteToBoard (props) {
  const [search, setSearch] = useState('')
  console.log(props.team)
  const searchUsers = props.users.filter(
    user =>
      (user.userName.includes(search.toLowerCase()) ||
        user.userName.includes(search.toUpperCase())) &&
      !props.team.includes(user._id)
  )
  return (
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
              key={user._id}
              id={user._id}
              onClick={e => {
                props.addTeamMember(e)
              }}
            >
              {user.userName}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

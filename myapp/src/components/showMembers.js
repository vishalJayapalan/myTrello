import React from 'react'

export default function ShowTeam (props) {
  const teamUsers = props.users.filter(user => props.team.includes(user._id))

  return (
    <div
      className='showTeamContainer'
      style={{
        marginTop: `${props.teamPosition.y + 30}px`,
        marginLeft: `${props.teamPosition.x}px`
      }}
    >
      <div className='showTeamTitleContainer'>
        <span>Team members</span>
        <i
          className='fas fa-times closeShowTeam'
          onClick={() => props.closeShowMembers()}
        />
      </div>
      <hr />
      <div>
        {teamUsers.map(teamUser => (
          <div key={teamUser._id} id={teamUser._id}>
            <span>{teamUser.userName}</span>
            <i
              className='fas fa-times removeFromTeam'
              onClick={e => props.removeTeamMember(e)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

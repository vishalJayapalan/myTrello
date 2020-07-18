import React from 'react'

export default function ShowMembers (props) {
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
          onClick={e => props.showMembers(e)}
        />
      </div>
      <hr />
      <div>
        {teamUsers.map(teamUser => (
          <div key={teamUser._id} id={teamUser._id}>
            <span>{teamUser.userName}</span>
            {teamUser._id !== props.board.adminUser && (
              <i
                className='fas fa-times removeFromTeam'
                onClick={e => props.removeTeamMember(e)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

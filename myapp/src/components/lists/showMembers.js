import React from 'react'
import { removeTeamMemberFunction } from '../users/userFunctions'
import { getCookie } from '../util/cookies'

export default function ShowMembers (props) {
  const teamUsers = props.users.filter(user =>
    props.board.team.includes(user._id)
  )
  return (
    <div
      className='showTeamPage'
      onClick={e =>
        e.target.className === 'showTeamPage' && props.showMembers(e)
      }
    >
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
            <div
              className='teamMemberContainer'
              key={teamUser._id}
              id={teamUser._id}
            >
              <span className='teamMember'>{teamUser.userName}</span>
              {teamUser._id !== props.board.adminUser && (
                <i
                  className='fas fa-times removeFromTeam'
                  onClick={e =>
                    removeTeamMemberFunction(
                      e,
                      props.board._id,
                      props.user,
                      getCookie,
                      props.updateBoardState,
                      props.updateBoardDeletedState
                    )
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'

export default function UserDetails ({
  showUserDetailsUpdate,
  userDetailsPosition,
  userNameSymbol,
  user,
  logoutAndReroute
}) {
  return (
    <div
      className='userDetailsPage'
      onClick={e =>
        e.target.className === 'userDetailsPage' && showUserDetailsUpdate(e)
      }
    >
      <div
        className='userDetailsContainer'
        style={{
          marginTop: `${userDetailsPosition.y + 30}px`,
          marginLeft: `${userDetailsPosition.x - 200}px`
        }}
      >
        <div className='userDetailsTitle'>
          <span>Account</span>
          <i
            className='fas fa-times closeUserDetails'
            onClick={e => showUserDetailsUpdate(e)}
          />
        </div>
        <hr />
        <div>
          <div className='userNameContainer'>
            <span
              className='navSpan'
              style={{ backgroundColor: '#dfe1e6', cursor: 'auto' }}
            >
              {userNameSymbol}
            </span>
            <div className='userNameNEmail'>
              <span>{user.userName}</span>
              <span style={{ color: 'grey' }}>{user.email}</span>
            </div>
          </div>
          <hr />
          <div className='logoutContainer' onClick={() => logoutAndReroute()}>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

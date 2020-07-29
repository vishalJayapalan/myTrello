import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function Navbar ({ user }) {
  const [logout, setLogout] = useState(false)

  function logoutAndReroute () {
    document.cookie =
      'x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setLogout(true)
  }

  return logout ? (
    <Redirect to='/login' />
  ) : (
    <nav className='nav'>
      <div>
        <Link to='/home'>
          <button className='button'>Home</button>
        </Link>
        <Link to='/boards'>
          <button className='button'>Boards</button>
        </Link>
      </div>
      <Link style={{ textDecoration: 'none' }} to='/boards'>
        <p className='navP'>Trello </p>
      </Link>

      <div className='userAndLogout'>
        {user && <span className='navSpan'>welcome {user.userName}</span>}
        <button className='button' onClick={() => logoutAndReroute()}>
          Logout
        </button>
      </div>
    </nav>
  )
}

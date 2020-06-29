import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function Navbar () {
  const [logout, setLogout] = useState(false)

  function logoutAndReroute () {
    // const setCookie = (name, value) => {
    // const d = new Date()
    // d.setTime(d.getTime() + 60 * 60 * 1000)
    // const expires = 'expires=' + d.toUTCString()
    document.cookie =
      'x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setLogout(true)
    // }
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
        <input type='text' placeholder='Search...' className='navInput' />
      </div>
      <Link style={{ textDecoration: 'none' }} to='/boards'>
        <p className='navP'>Trello </p>
      </Link>

      <div>
        <button className='button' onClick={() => logoutAndReroute()}>
          Logout
        </button>
        {/* <button className='button'>+</button>
        <button className='button'>i</button>
        <button className='button'>notification</button> */}
      </div>
    </nav>
  )
}

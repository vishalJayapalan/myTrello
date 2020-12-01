import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import UserDetails from './userDetails'

export default function Navbar () {
  const [logout, setLogout] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [userDetailsPosition, setUserDetailsPosition] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    getUser()
  }, [])

  async function getUser () {
    const response = await window.fetch('user')
    if (response.ok) {
      const jsonData = await response.json()

      // const jsonData = await response.json()
      // console.log('jsonData', jsonData)
      setUser(jsonData)
    }
  }

  let userNameSymbol = ''
  // console.log(user.userName)
  if (user.userName) {
    let userNameSymbolCreate = user.userName.split(' ')

    userNameSymbolCreate.forEach(username => {
      // console.log(username)
      userNameSymbol += username[0].toUpperCase()
    })
  }
  // console.log(userNameSymbol)
  function logoutAndReroute () {
    document.cookie =
      'x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setLogout(true)
  }

  function showUserDetailsUpdate (e) {
    setUserDetailsPosition(e.target.getBoundingClientRect())
    setShowUserDetails(prevState => !prevState)
  }

  return logout ? (
    <Redirect to='/login' />
  ) : (
    <nav className='nav'>
      <div>
        {/* <Link to='/home'>
          <button className='button'>Home</button>
        </Link> */}
        <Link to='/boards'>
          <button className='button'>Boards</button>
        </Link>
      </div>
      <Link style={{ textDecoration: 'none' }} to='/boards'>
        <p className='navP'>Trello </p>
      </Link>

      <div className='userAndLogout'>
        {user && (
          <span className='navSpan' onClick={showUserDetailsUpdate}>
            {userNameSymbol}
          </span>
        )}
        {showUserDetails && (
          <UserDetails
            showUserDetailsUpdate={showUserDetailsUpdate}
            userDetailsPosition={userDetailsPosition}
            userNameSymbol={userNameSymbol}
            user={user}
            logoutAndReroute={logoutAndReroute}
          />
        )}
        {/* <button className='button' onClick={() => logoutAndReroute()}>
          Logout
        </button> */}
      </div>
    </nav>
  )
}

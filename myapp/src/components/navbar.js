import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar () {
  return (
    <nav className='nav'>
      <div>
        <Link to='/'>
          <button className='button'>Home</button>
        </Link>
        <Link to='/boards'>
          <button className='button'>Boards</button>
        </Link>
        <input type='text' placeholder='Search...' className='navInput' />
      </div>
      <p className='navP'>Trello </p>
      <div>
        <button className='button'>+</button>
        <button className='button'>i</button>
        <button className='button'>notification</button>
      </div>
    </nav>
  )
}
